import { db } from '../../util/admin';

export default function (req, res) {
  const { quizId, roundId } = req.body;

  const document = db.doc(`/quiz/${quizId}/round/${roundId}`);
  document
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return res.status(404).send();
      }
      return document.delete().then(() => res.json({ message: 'Delete successful' }));
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}
