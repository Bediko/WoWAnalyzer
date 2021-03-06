import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import SpellIcon from 'common/SpellIcon';
import Analyzer from 'Parser/Core/Analyzer';
import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';
import { formatMilliseconds, formatNumber, formatPercentage } from 'common/format';

const CAST_BUFFER = 250;
const FIGHT_END_BUFFER = 7500;

const debug = false;

class WintersReach extends Analyzer {

  beginCastTimestamp = 0;
  castTimestamp = 0;
  buffUsed = false;
  beginCastFound = false;
  count = 0;
  wastedProcs = 0;
  usedProcs = 0;
  totalProcs = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTrait(SPELLS.WINTERS_REACH_TRAIT.id);
  }

  on_byPlayer_applybuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.WINTERS_REACH_BUFF.id) {
      return;
    }
    this.buffUsed = false;
    this.totalProcs += 1;
    this.buffAppliedTimestamp = event.timestamp;
    debug && console.log("Buff Applied @ " + formatMilliseconds(event.timestamp - this.owner.fight.start_time));
  }

  on_byPlayer_refreshbuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.WINTERS_REACH_BUFF.id) {
      return;
    }
    this.buffUsed = false;
    this.wastedProcs += 1;
    this.totalProcs += 1;
    debug && console.log("Buff Refreshed " + formatMilliseconds(event.timestamp - this.owner.fight.start_time));
  }

  on_byPlayer_removebuff(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.WINTERS_REACH_BUFF.id) {
      return;
    }
    debug && console.log("Buff Removed @ " + formatMilliseconds(event.timestamp - this.owner.fight.start_time));
    if (this.buffUsed === false) {
      this.wastedProcs += 1;
      debug && console.log("Buff Expired @ " + formatMilliseconds(event.timestamp - this.owner.fight.start_time));
    } else {
      this.usedProcs += 1;
    }
  }

  on_byPlayer_begincast(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.FLURRY.id) {
      return;
    }
    this.beginCastTimestamp = event.timestamp;
    this.beginCastFound = true;

    debug && console.log("Flurry Begin Cast @ " + formatMilliseconds(event.timestamp - this.owner.fight.start_time));
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.FLURRY.id || this.beginCastFound === false) {
      return;
    }
    this.beginCastFound = false;
    debug && console.log("Flurry Casted @ " + formatMilliseconds(event.timestamp - this.owner.fight.start_time));
    this.castTimestamp = event.timestamp;
    const castTime = this.castTimestamp - this.beginCastTimestamp;

    if (castTime >= CAST_BUFFER && this.selectedCombatant.hasBuff(SPELLS.WINTERS_REACH_BUFF.id)) {
      this.buffUsed = true;
      debug && console.log("Buff Used @ " + formatMilliseconds(event.timestamp - this.owner.fight.start_time));
    }
  }

  /*
    If the player gets a proc within the last 7.5 seconds of the fight then it wont count against them if they dont use it. This is mainly taking into account the reaction time of realizing you have the proc,
    potentially needing to clear the Brain Freeze procs they already have, the cast time on Flurry, and the travel time for all of the projectiles to hit the target.
  */
  on_finished() {
    if (this.selectedCombatant.hasBuff(SPELLS.WINTERS_REACH_BUFF.id)) {
      const adjustedFightEnding = this.owner.currentTimestamp - FIGHT_END_BUFFER;
      if (this.buffAppliedTimestamp < adjustedFightEnding) {
        this.wastedProcs += 1;
        debug && console.log("Fight Ended with Unused Proc @ " + formatMilliseconds(this.owner.currentTimestamp - this.owner.fight.start_time));
      } else {
        this.totalProcs -= 1;
      }
    }
    debug && console.log("Total Procs: " + this.totalProcs);
    debug && console.log("Used Procs: " + this.usedProcs);
    debug && console.log("Wasted Procs: " + this.wastedProcs);
  }

  get procsPerMinute() {
    return this.totalProcs / (this.owner.fightDuration / 60000);
  }

  get procUtilization() {
    return 1 - (this.wastedProcs / this.totalProcs);
  }

  get procUtilizationThresholds() {
    return {
      actual: this.procUtilization,
      isLessThan: {
        minor: 0.95,
        average: 0.90,
        major: 0.80,
      },
      style: 'percentage',
    };
  }

  suggestions(when) {
    when(this.procUtilizationThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<React.Fragment>You wasted {formatNumber(this.wastedProcs)} of your <SpellLink id={SPELLS.WINTERS_REACH_TRAIT.id} /> procs. These procs make your hard cast <SpellLink id={SPELLS.FLURRY.id} /> casts deal extra damage, so try and use them as quickly as possible to avoid losing over overwriting the procs.</React.Fragment>)
          .icon(SPELLS.WINTERS_REACH_TRAIT.icon)
          .actual(`${formatPercentage(this.procUtilization)}% Utilization`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`);
      });
  }
  statistic() {
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.WINTERS_REACH_TRAIT.id} />}
        value={`${formatPercentage(this.procUtilization, 0)} %`}
        label="Winter's Reach Utilization"
        tooltip={`This is a measure of how well you utilized your Winter's Reach Procs.
        <ul>
          <li>${this.procsPerMinute.toFixed(2)} Procs Per Minute</li>
          <li>${formatNumber(this.usedProcs)} Procs Used</li>
          <li>${formatNumber(this.wastedProcs)} Procs Wasted</li>
        </ul>
      `}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.OPTIONAL(0);
}

export default WintersReach;
