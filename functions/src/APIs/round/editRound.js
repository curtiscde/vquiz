import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators';

export default function (req, res) {
  const { quizId, roundId, name } = req.body;

  if (isEmpty(name)) {
    return res.status(400).json({ name: 'Must not be empty' });
  }

  const document = db.doc(`/quiz/${quizId}/round/${roundId}`);
  return document
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return res.status(404).send();
      }
      return document.update({
        name,
      }).then(() => res.json(snapshot.data()));
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}
