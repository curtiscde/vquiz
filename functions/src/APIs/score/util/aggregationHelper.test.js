import groupScoresByTeam from './aggregationHelper';

describe('aggregationHelper', () => {
  describe('groupScoresByTeam', () => {
    it('should return empty object for empty array', () => {
      const scores = [];
      expect(groupScoresByTeam(scores)).toEqual({});
    });

    it('should return a separate object per team', () => {
      const scores = [
        { docId: 'round1-team1', score: 1 },
        { docId: 'round1-team2', score: 1 },
      ];

      expect(groupScoresByTeam(scores)).toEqual({
        team1: {
          totalScore: 1,
          rounds: {
            round1: 1,
          },
        },
        team2: {
          totalScore: 1,
          rounds: {
            round1: 1,
          },
        },
      });
    });

    it('should calculate a total score per team', () => {
      const scores = [
        { docId: 'round1-team1', score: 1 },
        { docId: 'round1-team2', score: 1 },
        { docId: 'round2-team1', score: 8 },
        { docId: 'round2-team2', score: 4 },
        { docId: 'round3-team1', score: 3 },
        { docId: 'round3-team2', score: 9 },
      ];

      expect(groupScoresByTeam(scores)).toEqual({
        team1: {
          totalScore: 12,
          rounds: {
            round1: 1,
            round2: 8,
            round3: 3,
          },
        },
        team2: {
          totalScore: 14,
          rounds: {
            round1: 1,
            round2: 4,
            round3: 9,
          },
        },
      });
    });
  });
});
