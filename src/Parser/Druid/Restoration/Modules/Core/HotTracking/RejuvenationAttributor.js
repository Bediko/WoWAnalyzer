import SPELLS from 'common/SPELLS';
import ITEMS from 'common/ITEMS';
import Analyzer from 'Parser/Core/Analyzer';

import HotTracker from './HotTracker';

const REJUV_IDS = [
  SPELLS.REJUVENATION.id,
  SPELLS.REJUVENATION_GERMINATION.id,
];

const BUFFER_MS = 150; // saw a few cases of taking close to 150ms from cast -> applybuff

/*
 * Backend module tracks attribution of Rejuvenations
 */
class RejuvenationAttributor extends Analyzer {
  static dependencies = {
    hotTracker: HotTracker,
  };

  // objects hold attribution running totals
  powerOfTheArchdruid = { name: 'Power of the Archdruid', healing: 0, masteryHealing: 0, dreamwalkerHealing: 0, procs: 0 };
  tearstoneOfElune = { name: 'Tearstone of Elune', healing: 0, masteryHealing: 0, dreamwalkerHealing: 0, procs: 0 };
  t194p = { name: 'T19 4pc', healing: 0, masteryHealing: 0, dreamwalkerHealing: 0, procs: 0 };

  // cast tracking stuff
  lastRejuvCastTimestamp;
  lastRejuvTarget;
  castRejuvApplied; // occasionally procs happen on target that was just cast on, assures that no more than 1 apply/refreshbuff is attributed per cast
  lastWildGrowthCastTimestamp;

  // PotA tracking stuff
  lastPotaRejuvTimestamp;
  potaFallTimestamp; // FIXME temp until figure out hasBuff problem
  potaRejuvsRemaining = 0; // occasionally procs happen at same time as PotA consumption, assures that no more than 2 apply/refreshbuff is attributed per PotA
  potaTarget;

  // Tearstone tracking stuff
  lastWildgrowthTimestamp;
  hasTearstone;

  // 4T19 tracking stuff
  has4t19;

  constructor(...args) {
    super(...args);
    this.hasTearstone = this.selectedCombatant.hasFinger(ITEMS.TEARSTONE_OF_ELUNE.id);
    this.has4t19 = this.selectedCombatant.hasBuff(SPELLS.RESTO_DRUID_T19_4SET_BONUS_BUFF.id);
    this.castRejuvApplied = true;
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    const targetId = event.targetID;

    // set last cast timestamps, used for attribution of HoT applications later
    if (spellId === SPELLS.REJUVENATION.id) {
      this.lastRejuvCastTimestamp = event.timestamp;
      this.lastRejuvTarget = targetId;
      this.castRejuvApplied = false;
    } else if (spellId === SPELLS.WILD_GROWTH.id) {
      this.lastWildGrowthCastTimestamp = event.timestamp;
    }

    // check for PotA proc
    //const hadPota = this.selectedCombatant.hasBuff(SPELLS.POWER_OF_THE_ARCHDRUID_BUFF, null, BUFFER_MS);
    const hadPota = this.potaFallTimestamp && this.potaFallTimestamp + BUFFER_MS > event.timestamp;
    if (spellId === SPELLS.REJUVENATION.id && hadPota) {
      this.lastPotaRejuvTimestamp = event.timestamp;
      this.potaRejuvsRemaining = 2;
      this.potaTarget = targetId;
    }
  }

  on_byPlayer_applybuff(event) {
    this._getRejuvAttribution(event);
  }

  on_byPlayer_refreshbuff(event) {
    this._getRejuvAttribution(event);
  }

  on_byPlayer_removebuff(event) {
    if(event.ability.guid === SPELLS.POWER_OF_THE_ARCHDRUID_BUFF.id) {
      this.potaFallTimestamp = event.timestamp; // FIXME temp until figure out hasBuff problem
    }
  }

  // gets attribution for a given applybuff/refreshbuff of Rejuvenation or Germination
  _getRejuvAttribution(event) {
    const spellId = event.ability.guid;
    const targetId = event.targetID;
    if (!REJUV_IDS.includes(spellId)) {
      return;
    }
    if(!this.hotTracker.hots[targetId] || !this.hotTracker.hots[targetId][spellId]) {
      return;
    }

    const timestamp = event.timestamp;
    const attributions = [];

    if (event.prepull || (this.lastRejuvCastTimestamp + BUFFER_MS > timestamp && this.lastRejuvTarget === targetId && !this.castRejuvApplied)) {
      // regular cast (assume prepull applications are hardcast)
      // standard hardcast gets no special attribution
      this.castRejuvApplied = true;
    } else if (this.lastPotaRejuvTimestamp + BUFFER_MS > timestamp && this.potaTarget !== targetId && this.potaRejuvsRemaining > 0) { // PotA proc but not primary target
      attributions.push(this.powerOfTheArchdruid);
      this.potaRejuvsRemaining -= 1;
    } else if (this.hasTearstone && this.lastWildGrowthCastTimestamp + BUFFER_MS > timestamp) {
      attributions.push(this.tearstoneOfElune);
    } else if (this.has4t19) {
      attributions.push(this.t194p);
    } else {
      console.warn(`Unable to attribute Rejuv @${this.owner.formatTimestamp(timestamp)} on ${targetId}`);
    }

    attributions.forEach(att => {
      this.hotTracker.addAttribution(att, targetId, spellId);
    });
  }

}

export default RejuvenationAttributor;
