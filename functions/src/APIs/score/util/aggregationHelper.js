export default function groupScoresByTeam(scores) {
  const teamScores = {};

  scores.forEach((score) => {
    const [roundId, teamId] = score.docId.split('-');

    if (teamScores[teamId]) {
      teamScores[teamId].totalScore += score.score;
      teamScores[teamId].rounds[roundId] = score.score;
    } else {
      teamScores[teamId] = {
        totalScore: score.score,
        rounds: {
          [roundId]: score.score,
        },
      };
    }
  });

  return teamScores;
}
