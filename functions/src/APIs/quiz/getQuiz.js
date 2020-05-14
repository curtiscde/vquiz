import { db } from '../../util/admin';

export default function (req, res) {
  db
    .doc(`/quiz/${req.params.quizId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404);
      }
      if (doc.data().userId !== req.user.uid) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      const quizData = doc.data();
      quizData.id = doc.id;
      return res.json(quizData);
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}
