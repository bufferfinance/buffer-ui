export const WEEKLY_WIN_REWARDS_ALLOCATION_BY_LEAGUE = {
  diamond: 550,
  platinum: 384,
  gold: 307,
  silver: 217,
  bronze: 77,
};
export const WEEKLY_WIN_REWARDS_ALLOCATION_BY_LEAGUE_NEW = {
  2849: {
    diamond: 1110,
    platinum: 780,
    gold: 620,
    silver: 440,
    bronze: 177,
  },
  2850: {
    diamond: 1110,
    platinum: 780,
    gold: 620,
    silver: 440,
    bronze: 177,
  },
  2851: {
    diamond: 1110,
    platinum: 780,
    gold: 620,
    silver: 440,
    bronze: 177,
  },
  2852: {
    diamond: 635,
    platinum: 450,
    gold: 355,
    silver: 250,
    bronze: 100,
  },
};

export const EligibilityCriteria = {
  diamond: 10000,
  platinum: 2500,
  gold: 1000,
  silver: 500,
  bronze: 0,
};

const legues = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
export const getEligibilityInfo = (league: string) => {
  league = league.toLowerCase();
  const index = legues.indexOf(league);
  let nextLeague = null;
  let currLeague = {
    league: league,
    criteria: EligibilityCriteria[league],
  };
  if (index === legues.length - 1) return [currLeague, null];
  return [
    currLeague,
    {
      league: legues[index + 1],
      criteria: EligibilityCriteria[legues[index + 1]],
    },
  ];
};
