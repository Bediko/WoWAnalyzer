import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';

import { formatPercentage } from 'common/format';

import SoulShardTracker from '../SoulShards/SoulShardTracker';


// credit to feretory of souls module
class SoulConduit extends Analyzer {
  static dependencies = {
    soulShardTracker: SoulShardTracker,
    };

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.SOUL_CONDUIT_TALENT.id);
  }

  subStatistic() {
    const spent = this.soulShardTracker.spent / 10;
    const shardsGained = this.soulShardTracker.getGeneratedBySpell(SPELLS.SOUL_CONDUIT_TALENT.id) / 10;
    return (
      <div className="flex">
        <div className="flex-main">
          <SpellLink id={SPELLS.SOUL_CONDUIT_TALENT.id}>
            Soul Shards Gained
          </SpellLink>
        </div>
        <div className="flex-sub text-right">
        <dfn data-tip={`Your Soul Conduit refunded ${formatPercentage(shardsGained/spent)} % of soul shards spent`}>
            {shardsGained}
          </dfn>
        </div>
      </div>
    );
  }
}

export default SoulConduit;
