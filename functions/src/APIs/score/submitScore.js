import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators';

export default function (req, res) {
  const { quizId, scores } = req.body;

  if (isEmpty(quizId)) {
    return res.status(400).json({ quizId: 'Must not be empty' });
  }
  if (!scores || !scores.length) {
    return res.status(400).json({ scores: 'Missing' });
  }

  try {
    const batch = db.batch();

    scores.forEach((score) => {
      const docRef = db
        .collection('quiz')
        .doc(quizId)
        .collection('score')
        .doc(`${score.roundId}-${score.teamId}`);
      batch.set(docRef, {
        score: score.score,
      });
    });

    batch.commit()
      .then(() => res.send());
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}
