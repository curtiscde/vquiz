export default function groupScoresByTeam(scores) {
  const teamScores = {};

  scores.forEach((score) => {
    const teamId = score.docId.split('-')[1];


    teamScores[teamId] = teamScores[teamId]
      ? teamScores[teamId] += score.score
      : teamScores[teamId] = score.score;

    // const existingTeam = teamScores.find((teamScore) => teamScore.teamId === teamId);
    // if (existingTeam) {
    //   existingTeam.score += score.score;
    // } else {
    //   teamScores.push({
    //     teamId,
    //     score: score.score,
    //   });
    // }
  });

  return teamScores;
}
