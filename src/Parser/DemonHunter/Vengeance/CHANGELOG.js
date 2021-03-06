import React from 'react';

import { Yajinni, Mamtooth } from 'CONTRIBUTORS';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';

export default [
  {
    date: new Date('2018-08-5'),
    changes: <React.Fragment>Added stat box for <SpellLink id={SPELLS.FEED_THE_DEMON_TALENT.id} /> showing amount of CD reduction it provides.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-08-5'),
    changes: <React.Fragment>Added stat box for <SpellLink id={SPELLS.GLUTTONY_TALENT.id} /> showing number of procs.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-08-4'),
    changes: <React.Fragment>Big update to the checklist and suggestions threshholds to support it.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-08-3'),
    changes: <React.Fragment>Added stat box for <SpellLink id={SPELLS.AGONIZING_FLAMES_TALENT.id} /> to show the extra dps it provides.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-08-3'),
    changes: <React.Fragment><SpellLink id={SPELLS.THROW_GLAIVE.id} /> CD is now reduced by haste and being properly treated.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2018-08-3'),
    changes: <React.Fragment>Removed <SpellLink id={SPELLS.DEMON_SPIKES.id} /> checklist and cast efficiency suggestion if <SpellLink id={SPELLS.FEED_THE_DEMON_TALENT.id} /> is selected. Each time a Soul Fragment is consumed, the Demon Spikes CD is reduced by 0.5s, so when this talent was chosen, it was breaking the CD tracker, usage suggestions (it was casted more than suggested casts) and timeline was warning about CD not properly treated.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2018-08-3'),
    changes: <React.Fragment>Removed tier 20 suggestions and modules (ToS tier).</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2018-08-3'),
    changes: <React.Fragment>Added suggestion for <SpellLink id={SPELLS.VOID_REAVER_DEBUFF.id} /> and showed its uptime.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-08-01'),
    changes: <React.Fragment>Implemented Checklist feature.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2018-08-1'),
    changes: <React.Fragment>Added suggestion for <SpellLink id={SPELLS.SOUL_CLEAVE.id} />.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-30'),
    changes: <React.Fragment>Updated code for <SpellLink id={SPELLS.FRACTURE_TALENT.id} /> to reflect it replaces <SpellLink id={SPELLS.SHEAR.id} />.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-29'),
    changes: <React.Fragment>Updated code for all sigils. They have different spell ids depending on if you take <SpellLink id={SPELLS.QUICKENED_SIGILS_TALENT.id} /> or <SpellLink id={SPELLS.CONCENTRATED_SIGILS_TALENT.id} />.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-28'),
    changes: <React.Fragment>Added module to show how many <SpellLink id={SPELLS.SPIRIT_BOMB_TALENT.id} /> casts were good.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-28'),
    changes: <React.Fragment>Added new spells and talents.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2018-07-25'),
    changes: <React.Fragment>Reworked soul fragment tracking code to make it more versatile. Added a consumed souls module that shows how/what spells were used to consume souls.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-23'),
    changes: <React.Fragment>Updated the wasted soul fragments tracker. Its now sould fragments inefficienctly used and it's info is clearer.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-23'),
    changes: <React.Fragment>Added <SpellLink id={SPELLS.FRACTURE_TALENT.id} /> casts to suggestions.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-22'),
    changes: <React.Fragment>Reworked <SpellLink id={SPELLS.DEMON_SPIKES.id} /> module to show stats/suggestion based on the physical hits you mitgated instead of cast efficiency.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-21'),
    changes: <React.Fragment>Cleaned up spells and traits. Removed old/outdated ones and updated the changed ones. No longer crashes due to prepatch.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-18'),
    changes: <React.Fragment>Added death recap tab and defensive abilities tracking.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-10'),
    changes: <React.Fragment>Reworked Empower Wards to show damage mitigated and if it was avalible to be used.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-10'),
    changes: <React.Fragment>Reworked <SpellLink id={SPELLS.SIGIL_OF_FLAME_CONCENTRATED.id} /> to show damage and if its stacked.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-05'),
    changes: <React.Fragment>Added more spell suggestions.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-05'),
    changes: <React.Fragment>Updated <SpellLink id={SPELLS.DEMON_SPIKES.id} /> module to track hits taken while debuff is up and missed uses.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-04'),
    changes: <React.Fragment>Added tracking of Pain management/waste and a new Pain Usage Tab.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-04'),
    changes: <React.Fragment>Added tracking of <SpellLink id={SPELLS.PAINBRINGER.id} /> uptime and stacks.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-05-03'),
    changes: <React.Fragment>Added tracking of <SpellLink id={SPELLS.SOUL_BARRIER_TALENT.id} /> uptime and damage/healing stats.</React.Fragment>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2017-09-03'),
    changes: 'Changed the Github link for the issues of Vengeance spec.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-02'),
    changes: 'Pain chart now displays a error message for corrupted logs.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-10-13'),
    changes: 'Pain chart bug fix.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-10-12'),
    changes: <React.Fragment>Cooldown tab for <SpellLink id={SPELLS.METAMORPHOSIS_TANK.id} /> is now implemented.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-10-12'),
    changes: 'Updated \'More Information\' tab, with introduction text and links.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-23'),
    changes: 'Tier 20 - 2 and 4 piece bonus is now being tracked.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-16'),
    changes: 'Created a Soul Fragments tracker (with total generated/spent/wasted/unused) and improvement suggestion for wasted Soul Fragments.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-16'),
    changes: <React.Fragment><SpellLink id={SPELLS.SPIRIT_BOMB_TALENT.id} /> is now on statistics boxes too.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-09'),
    changes: 'Some nearly unused abilities and/or no CD abilities now doesn\'t show \'can be improved\' in Cast Efficiency tab.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-07'),
    changes: 'Abilities now trigger mouseover tooltips on statistic boxes.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-07'),
    changes: 'Updated timers in the statistics tooltips.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-06'),
    changes: <React.Fragment>Added more suggestions to <SpellLink id={SPELLS.IMMOLATION_AURA_BUFF.id} /> buff uptime.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-09-06'),
    changes: <React.Fragment>Fixed <SpellLink id={SPELLS.SIGIL_OF_FLAME_DEBUFF.id} /> debuff uptime to best fit in more cases.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-08-27'),
    changes: <React.Fragment>Fixed a bug with <SpellLink id={SPELLS.SPIRIT_BOMB_TALENT.id} /> uptime suggestions and modified the Dead GCD recommended time (ABC).</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-08-20'),
    changes: <React.Fragment>Added Pain tracker chart and changed <SpellLink id={SPELLS.SPIRIT_BOMB_TALENT.id} /> uptime buff to <SpellLink id={SPELLS.FRAILTY_SPIRIT_BOMB_DEBUFF.id} /> debuff uptime.</React.Fragment>,
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-08-19'),
    changes: 'Added more useful and specific statistics tooltips.',
    contributors: [Mamtooth],
  },
  {
    date: new Date('2017-08-16'),
    changes: 'Added Vengeance Demon Hunter support.',
    contributors: [Mamtooth],
  },
];
