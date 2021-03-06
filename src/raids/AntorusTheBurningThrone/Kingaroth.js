import Background from './Images/Backgrounds/Kingaroth.jpg';
import Headshot from './Images/Headshots/Kingaroth.png';

export default {
  id: 2088,
  name: 'Kin\'garoth',
  background: Background,
  headshot: Headshot,
  icon: 'achievement_boss_argus_titanbuilder',
  fight: {
    vantusRuneBuffId: 250148,
    // TODO: Add fight specific props
    // e.g. baseDowntime (seconds, percentage, based on (de)buff, etc)
    // e.g. ads
    softMitigationChecks: {
      ForgingStrike: 254919,
    },
  },
};
