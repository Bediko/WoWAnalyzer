import React from 'react';
import Module from 'Parser/Core/Module';
import HIT_TYPES from 'Parser/Core/HIT_TYPES';
import { formatNumber } from 'common/format';
import Combatants from 'Parser/Core/Modules/Combatants';
import HealingValue from 'Parser/Core/Modules/HealingValue';

import { getSpellInfo } from '../../SpellInfo';

const DEBUG = true;

const ARMOR_INT_MULTIPLIER = 1.05; // 5% int bonus from wearing all leather means each new point of int worth 1.05 vs character sheet int
const BASE_CRIT_MULTIPLIER = 2;

class StatWeights extends Module {
  static dependencies = {
    combatants: Combatants,
  };

  critMultiplier = BASE_CRIT_MULTIPLIER; // TODO handle Tauren / DoS?

  totalNonIgnoredHealing = 0;

  totalOneInt = 0;
  totalOneCrit = 0;
  totalOneHasteHpm = 0;
  totalOneHasteHpct = 0;
  totalOneMastery = 0;
  totalOneVers = 0;

  on_initialized() {
    // TODO do I have to set anything here?
  }

  on_byPlayer_heal(event) {
    const healVal = new HealingValue(event.amount, event.absorbed, event.overheal);
    this._handleHeal(event, healVal);
  }

  on_byPlayer_absorbed(event) {
    const healVal = new HealingValue(event.amount, 0, 0);
    this._handleHeal(event, healVal);
  }

  _handleHeal(event, healVal) {
    const target = this.combatants.getEntity(event);
    if(target === null) {
      return;
    }

    const spellInfo = getSpellInfo(event.ability.guid);
    if(spellInfo.ignored) {
      return;
    }

    this.totalNonIgnoredHealing += healVal.effective;
    if(healVal.overheal) {
      return; // if a spell overheals, we know it couldn't have healed for more
    }

    const hotCount = target.activeBuffs()
        .map(buffObj => buffObj.ability.guid)
        .filter(buffId => getSpellInfo(buffId).masteryStack)
        .length;
    //const decomposedHeal = this._decompHeal(spellInfo, healVal.effective, hotCount, (event.hitType === 2));
    const amount = healVal.effective;

    // INT //
    let oneInt = 0;
    if(spellInfo.int) {
      const currInt = this.combatants.selected.intellect; // TODO replace when dynamic stats
      const bonusFromOneInt = (1 / currInt) * ARMOR_INT_MULTIPLIER;
      oneInt = amount * bonusFromOneInt;
    }

    // CRIT //
    let oneCrit = 0;
    if(spellInfo.crit) {
      const currCritPerc = this.combatants.selected.critPercentage; // TODO replace when dynamic stats
      const bonusFromOneCrit = 1 / 40000; // TODO replace when stat constants exist
      if(spellInfo.isLivingSeed) {
        const additionalLivingSeedChance = bonusFromOneCrit / currCritPerc;
        oneCrit = additionalLivingSeedChance * amount;
      } else {
        const noCritHealing = event.hitType === HIT_TYPES.CRIT ? amount / this.critMultiplier : amount;
        oneCrit = noCritHealing * bonusFromOneCrit * (this.critMultiplier - 1);
      }
    }

    // HASTE //
    // FIXME haste hpct calc is a mess and probably wrong
    const currHastePerc = this.combatants.selected.hastePercentage; // TODO replace when dynamic stats
    const bonusFromOneHaste = 1 / 37500; // TODO replace when stat constants exist
    const noHasteHealing = amount / (1 + currHastePerc);

    let oneHasteHpm = 0;
    let oneHasteHpct = 0;
    if(spellInfo.hasteHpm) {
      oneHasteHpm = bonusFromOneHaste * noHasteHealing;
    //  oneHasteHpct = bonusFromOneHaste * noHasteHealing;
    }

    //if(spellInfo.hasteHpct) {
      let noHasteHpctHealing = noHasteHealing;
      if(spellInfo.hasteHpm) {
        noHasteHpctHealing /= (1 + currHastePerc);
      }

      let bonusFromOneHasteHpct = bonusFromOneHaste;
      if(spellInfo.hasteHpm) {
        bonusFromOneHasteHpct *= (1 + bonusFromOneHaste);
      }

      oneHasteHpct = bonusFromOneHasteHpct * noHasteHpctHealing;
  //  }

    // MASTERY //
    let oneMastery = 0;
    if(spellInfo.mastery) {
      const currMasteryPerc = this.combatants.selected.masteryPercentage; // TODO replace when dynamic stats
      const bonusFromOneMastery = 1 / 66666; // TODO replace when stat constants exist
      const noMasteryHealing = amount / (1 + (currMasteryPerc * hotCount));
      oneMastery = noMasteryHealing * bonusFromOneMastery * hotCount;
    }

    // VERS //
    let oneVers = 0;
    if(spellInfo.vers) {
      const currVersPerc = this.combatants.selected.versatilityPercentage; // TODO replace when dynamic stats
      const bonusFromOneVers = 1 / 47500; // TODO replace when stat constants exist
      const noVersHealing = amount / (1 + currVersPerc);
      oneVers = noVersHealing * bonusFromOneVers;
    }

    this.totalOneInt += oneInt;
    this.totalOneCrit += oneCrit;
    this.totalOneHasteHpm += oneHasteHpm;
    this.totalOneHasteHpct += oneHasteHpct;
    this.totalOneMastery += oneMastery;
    this.totalOneVers += oneVers;
  }

  _ratingPerOnePercent(oneRatingHealing) {
    const onePercentHealing = this.totalNonIgnoredHealing / 100;
    return onePercentHealing / oneRatingHealing;
  }

  on_finished() {
    if(DEBUG) {
      console.log(`Int - ${formatNumber(this.totalOneInt)}`);
      console.log(`Crit - ${formatNumber(this.totalOneCrit)}`);
      console.log(`Haste HPM - ${formatNumber(this.totalOneHasteHpm)}`);
      console.log(`Haste HPCT - ${formatNumber(this.totalOneHasteHpct)}`);
      console.log(`Mastery - ${formatNumber(this.totalOneMastery)}`);
      console.log(`Vers - ${formatNumber(this.totalOneVers)}`);
    }
  }

  //
  tab() {
    const intForOnePercent = this._ratingPerOnePercent(this.totalOneInt);
    const critForOnePercent = this._ratingPerOnePercent(this.totalOneCrit);
    const hasteHpmForOnePercent = this._ratingPerOnePercent(this.totalOneHasteHpm);
    const hasteHpctForOnePercent = this._ratingPerOnePercent(this.totalOneHasteHpct);
    const masteryForOnePercent = this._ratingPerOnePercent(this.totalOneMastery);
    const versForOnePercent = this._ratingPerOnePercent(this.totalOneVers);

    const intWeight = this.totalOneInt / this.totalOneInt;
    const critWeight = this.totalOneCrit / this.totalOneInt;
    const hasteHpmWeight = this.totalOneHasteHpm / this.totalOneInt;
    const hasteHpctWeight = this.totalOneHasteHpct / this.totalOneInt;
    const masteryWeight = this.totalOneMastery / this.totalOneInt;
    const versWeight = this.totalOneVers / this.totalOneInt;

    return {
      title: 'Stat Weights',
      url: 'stat-weights',
      render: () => (
        <div style={{ marginLeft: 20, marginTop: 20, marginBottom: 10 }}>
          <h1>Stat Weights</h1>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ maxWidth: 60 }}><b>Stat</b></th>
                <th style={{ maxWidth: 60 }}><dfn data-tip="Normalized on Int's weight"><b>Weight</b></dfn></th>
                <th style={{ maxWidth: 60 }}><b>Rating per 1%</b></th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Int</td>
                <td>{formatNumber(intWeight)}</td>
                <td>{formatNumber(intForOnePercent)}</td>
              </tr>
              <tr>
                <td>Crit</td>
                <td>{formatNumber(critWeight)}</td>
                <td>{formatNumber(critForOnePercent)}</td>
              </tr>
              <tr>
                <td>Haste HPM</td>
                <td>{formatNumber(hasteHpmWeight)}</td>
                <td>{formatNumber(hasteHpmForOnePercent)}</td>
              </tr>
              <tr>
                <td>Haste HPCT</td>
                <td>{formatNumber(hasteHpctWeight)}</td>
                <td>{formatNumber(hasteHpctForOnePercent)}</td>
              </tr>
              <tr>
                <td>Mastery</td>
                <td>{formatNumber(masteryWeight)}</td>
                <td>{formatNumber(masteryForOnePercent)}</td>
              </tr>
              <tr>
                <td>Versatility</td>
                <td>{formatNumber(versWeight)}</td>
                <td>{formatNumber(versForOnePercent)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    };
  }
}

export default StatWeights;
