import SPELLS from 'common/SPELLS';

import CoreAbilities from 'Parser/Core/Modules/Abilities';
import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';

class Abilities extends CoreAbilities {
  spellbook() {
    const combatant = this.selectedCombatant;
    return [
      // Rotational
      {
        spell: SPELLS.MORTAL_STRIKE,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 6 / (1 + haste),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.OVERPOWER,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: 12,
        charges: 1 + (combatant.hasTalent(SPELLS.DREADNAUGHT_TALENT.id) ? 1 : 0),
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.SLAM,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.REND_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.REND_TALENT.id),
      },
      {
        spell: SPELLS.COLOSSUS_SMASH,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
        enabled: !combatant.hasTalent(SPELLS.WARBREAKER_TALENT.id),
      },
      {
        spell: SPELLS.SKULLSPLITTER_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        cooldown: haste => 21 / (1 + haste),
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.SKULLSPLITTER_TALENT.id),
      },
      {
        spell: SPELLS.EXECUTE,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      // Rotational AOE
      {
        spell: SPELLS.WARBREAKER_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        cooldown: 45,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6, // I don't know at what efficiency this talent becomes worth it so I'm keeping it save
        },
        enabled: combatant.hasTalent(SPELLS.WARBREAKER_TALENT.id), // replaces Colussus Smash
      },
      {
        spell: SPELLS.CLEAVE_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        cooldown: haste => 6 / (1 + haste),
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6, // I don't know at what efficiency this talent becomes worth it so I'm keeping it save
        },
        enabled: combatant.hasTalent(SPELLS.CLEAVE_TALENT.id),
      },
      {
        spell: SPELLS.SWEEPING_STRIKES,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        buffSpellId: SPELLS.SWEEPING_STRIKES.id,
        cooldown: 25,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.WHIRLWIND,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.BLADESTORM,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
        enabled: !combatant.hasTalent(SPELLS.RAVAGER_TALENT_ARMS.id),
      },
      {
        spell: SPELLS.RAVAGER_TALENT_ARMS,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.RAVAGER_TALENT_ARMS.id), // Replaces Bladestorm
      },
      // Others
      {
        spell: SPELLS.VICTORY_RUSH,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        gcd: {
          base: 1500,
        },
        enabled: !combatant.hasTalent(SPELLS.IMPENDING_VICTORY_TALENT.id),
      },
      {
        spell: SPELLS.IMPENDING_VICTORY_TALENT,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.IMPENDING_VICTORY_TALENT.id), // Replaces Victory Rush
      },
      // Cooldowns
      {
        spell: SPELLS.AVATAR_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
        enabled: combatant.hasTalent(SPELLS.AVATAR_TALENT.id),
      },
      {
        spell: SPELLS.DEADLY_CALM_TALENT,
        buffSpellId: SPELLS.DEADLY_CALM_TALENT.id,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 60,
        gcd: null,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
        enabled: combatant.hasTalent(SPELLS.DEADLY_CALM_TALENT.id),
      },
      // Defensive
      {
        spell: SPELLS.DEFENSIVE_STANCE_TALENT,
        buffSpellId: SPELLS.DEFENSIVE_STANCE_TALENT.id,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: 6,
        gcd: null,
        castEfficiency: {
          // TODO: Add a statistic to show how much damage was lost due to defensive stance
          // TODO: Add a suggestion regarding having this up too much
          // TODO: Add a suggestion regarding having this up too little, and then deactivate the cast efficiency since uptime is more accurate
          suggestion: true,
          recommendedEfficiency: 0.4,
          extraSuggestion: 'If you\'re using this talent over something that passively increases your mobility or survivability, you better use it.',
        },
        enabled: combatant.hasTalent(SPELLS.DEFENSIVE_STANCE_TALENT.id),
      },
      {
        spell: SPELLS.DIE_BY_THE_SWORD,
        buffSpellId: SPELLS.DIE_BY_THE_SWORD.id,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        cooldown: 180,
        gcd: null,
      },
      {
        spell: SPELLS.RALLYING_CRY,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        buffSpellId: SPELLS.RALLYING_CRY_BUFF.id,
        cooldown: 180,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6,
          importance: ISSUE_IMPORTANCE.MINOR,
          extraSuggestion: 'Use it preemptively as a buffer against large AOE, or reactively if you notice your raid is getting dangerously low on health.',
        },
      },
      // Utility
      {
        spell: SPELLS.CHARGE,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 20 - (combatant.hasTalent(SPELLS.DOUBLE_TIME_TALENT.id) ? 3 : 0),
        charges: 1 + (combatant.hasTalent(SPELLS.DOUBLE_TIME_TALENT.id) ? 1 : 0),
        gcd: {
          static: 500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.01,
          extraSuggestion: 'Use it to get back into range after moving out to avoid mechanics. Not only does this allow you to get back to DPSing faster, it also generates rage for you to DPS with.',
        },
      },
      {
        spell: SPELLS.HEROIC_LEAP,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        buffSpellId: SPELLS.BOUNDING_STRIDE_BUFF.id,
        cooldown: (haste, combatant) => 45 - (combatant.hasTalent(SPELLS.BOUNDING_STRIDE_TALENT.id) ? 15 : 0),
        gcd: null,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.01,
          extraSuggestion: 'Use it to escape mechanics at the last moment, allowing you more time to DPS.',
        },
      },
      {
        spell: SPELLS.STORM_BOLT_TALENT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.4,
          extraSuggestion: 'If you\'re picking a utility talent over something that increases your mobility or survivability, you better use it.',
        },
        enabled: combatant.hasTalent(SPELLS.STORM_BOLT_TALENT.id),
      },
      {
        spell: SPELLS.PUMMEL,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 15,
        gcd: null,
      },
      {
        spell: SPELLS.BERSERKER_RAGE,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        buffSpellId: SPELLS.BERSERKER_RAGE,
        cooldown: 60,
        gcd: null,
      },
      {
        spell: SPELLS.HEROIC_THROW,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 6,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.INTIMIDATING_SHOUT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 90,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.HAMSTRING,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.BATTLE_SHOUT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 15,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.TAUNT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 8,
        gcd: null,
      },
    ];
  }
}

export default Abilities;
