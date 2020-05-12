import groupScoresByTeam from './aggregationHelper';

describe('aggregationHelper', () => {
  describe('groupScoresByTeam', () => {
    it('should return empty array for empty array', () => {
      const scores = [];
      expect(groupScoresByTeam(scores)).toEqual([]);
    });

    it('should return a separate object per team', () => {
      const scores = [
        { docId: 'round1-team1', score: 1 },
        { docId: 'round1-team2', score: 1 },
      ];

      expect(groupScoresByTeam(scores)).toEqual([
        { teamId: 'team1', score: 1 },
        { teamId: 'team2', score: 1 },
      ]);
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

      expect(groupScoresByTeam(scores)).toEqual([
        { teamId: 'team1', score: 12 },
        { teamId: 'team2', score: 14 },
      ]);
    });
  });
});
