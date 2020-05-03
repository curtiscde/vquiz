import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators';

export default async function (req, res) {
  const { quizId, scores } = req.body;

  if (isEmpty(quizId)) {
    return res.status(400).json({ quizId: 'Must not be empty' });
  }
  if (!scores || !scores.length) {
    return res.status(400).json({ scores: 'Missing' });
  }

  try {
    const scoresCol = db
      .collection('quiz')
      .doc(quizId)
      .collection('score');

    await Promise.all(scores.forEach(async (score) => {
      await scoresCol
        .doc(`${score.roundId}-${score.teamId}`)
        .set({
          score: score.score,
        });
    }));

    return res.send();
  } catch (error) {
    return res.status(500).send();
  }
}
