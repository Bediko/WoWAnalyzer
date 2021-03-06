import CoreCombatLogParser from 'Parser/Core/CombatLogParser';
import LowHealthHealing from 'Parser/Core/Modules/Features/LowHealthHealing';
import HealingDone from 'Parser/Core/Modules/HealingDone';

import AtonementSuccessiveDamageNormalizer from './Normalizers/AtonementSuccessiveDamage';
import EstelNormalizer from './Normalizers/EstelNormalizer';
import ShadowfiendNormalizer from './Normalizers/ShadowfiendNormalizer';
import PowerWordRadianceNormalizer from './Normalizers/PowerWordRadianceNormalizer';

import Abilities from './Modules/Abilities';
import SpellUsable from './Modules/Core/SpellUsable';
import SpellManaCost from './Modules/Core/SpellManaCost';
import AbilityTracker from './Modules/Core/AbilityTracker';
import Channeling from './Modules/Core/Channeling';
import GlobalCooldown from './Modules/Core/GlobalCooldown';

import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import Checklist from './Modules/Features/Checklist/Module';
import CooldownThroughputTracker from './Modules/Features/CooldownThroughputTracker';
import PowerWordShieldWasted from './Modules/Features/PowerWordShieldWasted';
import AtonementApplicationSource from './Modules/Features/AtonementApplicationSource';
import AtonementDamageSource from './Modules/Features/AtonementDamageSource';
import AtonementHealingDone from './Modules/Features/AtonementHealingDone';
import PowerWordBarrier from './Modules/Features/PowerWordBarrier';
import Lenience from './Modules/Spells/Lenience';
import PurgeTheWicked from './Modules/Features/PurgeTheWicked';

import Tier19_2set from './Modules/Items/Tier19_2set';
import CordOfMaiev from './Modules/Items/CordOfMaiev';
import Skjoldr from './Modules/Items/Skjoldr';
import Xalan from './Modules/Items/Xalan';
import NeroBandOfPromises from './Modules/Items/NeroBandOfPromises';
import TarnishedSentinelMedallion from './Modules/Items/TarnishedSentinelMedallion';
import CarafeOfSearingLight from './Modules/Items/CarafeOfSearingLight';
import MarchOfTheLegion from './Modules/Items/MarchOfTheLegion';
import Tier20_2set from './Modules/Items/Tier20_2set';
import Tier20_4set from './Modules/Items/Tier20_4set';
import Tier21_2set from './Modules/Items/Tier21_2set';
import Tier21_4set from './Modules/Items/Tier21_4set';
import Estel from './Modules/Items/Estel';
import SoulOfTheHighPriest from './Modules/Items/SoulOfTheHighPriest';

import TwistOfFate from './Modules/Spells/TwistOfFate';
import Castigation from './Modules/Spells/Castigation';
import Atonement from './Modules/Spells/Atonement';
import Evangelism from './Modules/Spells/Evangelism';
import Penance from './Modules/Spells/Penance';
import TouchOfTheGrave from './Modules/Spells/TouchOfTheGrave';
import LuminousBarrier from './Modules/Spells/LuminousBarrier';
import DesperatePrayer from '../Shared/Modules/Features/DesperatePrayer';
import Contrition from './Modules/Spells/Contrition';
import Grace from './Modules/Spells/Grace';
import Schism from './Modules/Spells/Schism';

import GiftOfForgiveness from './Modules/AzeriteTraits/GiftOfForgiveness';

import SinsOfTheMany from './Modules/Spells/SinsOfTheMany';

import { ABILITIES_AFFECTED_BY_HEALING_INCREASES } from './Constants';

class CombatLogParser extends CoreCombatLogParser {
  static abilitiesAffectedByHealingIncreases = ABILITIES_AFFECTED_BY_HEALING_INCREASES;

  static specModules = {
    // Normalizers
    atonementSuccessiveDamage: AtonementSuccessiveDamageNormalizer,
    estelNormalizer: EstelNormalizer,
    shadowfiendNormalizer: ShadowfiendNormalizer,
    powerWordRadianceNormalizer: PowerWordRadianceNormalizer,

    healingDone: [HealingDone, { showStatistic: true }],
    spellUsable: SpellUsable,
    spellManaCost: SpellManaCost,
    abilityTracker: AbilityTracker,
    lowHealthHealing: LowHealthHealing,
    abilities: Abilities,
    channeling: Channeling,
    globalCooldown: GlobalCooldown,

    // Features
    checklist: Checklist,

    // Abilities
    penance: Penance,
    alwaysBeCasting: AlwaysBeCasting,
    cooldownThroughputTracker: CooldownThroughputTracker,
    powerWordShieldWasted: PowerWordShieldWasted,
    atonementApplicationSource: AtonementApplicationSource,
    atonementDamageSource: AtonementDamageSource,
    atonementHealingDone: AtonementHealingDone,
    powerWordBarrier: PowerWordBarrier,
    lenience: Lenience,
    purgeTheWicked: PurgeTheWicked,

    // Items:
    tier19_2set: Tier19_2set,
    cordOfMaiev: CordOfMaiev,
    skjoldr: Skjoldr,
    xalan: Xalan,
    neroBandOfPromises: NeroBandOfPromises,
    tarnishedSentinelMedallion: TarnishedSentinelMedallion,
    carafeOfSearingLight: CarafeOfSearingLight,
    marchOfTheLegion: MarchOfTheLegion,
    tier20_2set: Tier20_2set,
    tier20_4set: Tier20_4set,
    tier21_2set: Tier21_2set,
    tier21_4set: Tier21_4set,
    estel: Estel,
    soulOfTheHighPriest: SoulOfTheHighPriest,

    // Spells (talents and traits):
    twistOfFate: TwistOfFate,
    castigation: Castigation,
    atonement: Atonement,
    evangelism: Evangelism,
    touchOfTheGrave: TouchOfTheGrave,
    luminousBarrier: LuminousBarrier,
    desperatePrayer: DesperatePrayer,
    contrition: Contrition,
    grace: Grace,
    schism: Schism,
    sinsOfTheMany: SinsOfTheMany,

    // Azerite Traits
    gift: GiftOfForgiveness,
  };
}

export default CombatLogParser;
