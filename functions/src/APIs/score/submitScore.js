import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators';
import groupScoresByTeam from './util/aggregationHelper';

function getScoresByTeam(quizId) {
  return db
    .collection('quiz')
    .doc(quizId)
    .collection('score')
    .get()
    .then((snapshot) => {
      const scores = [];
      snapshot.forEach((doc) => {
        scores.push({
          docId: doc.id,
          score: doc.data().score,
        });
      });
      return groupScoresByTeam(scores);
    })
}

function aggregateScores(quizId, teamScores) {
  return db
    .collection('quiz')
    .doc(quizId)
    .collection('team')
    .get()
    .then((snapshot) => {
      const teams = [];
      snapshot.forEach((doc) => {
        db.collection('quiz')
          .doc(quizId)
          .collection('team')
          .doc(doc.id)
          .update({
            totalScore: teamScores[doc.id] || 0,
          });
      });
      return teams;
    })
}

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

    return batch.commit()
      .then(() => getScoresByTeam(quizId))
      .then((teamScores) => aggregateScores(quizId, teamScores))
      .then(() => res.send());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).send();
  }
}
