import { db } from '../../util/admin';
import deleteStorage from '../../util/deleteStorage';

export default function (req, res) {
  const { quizId, teamId } = req.body;

  const document = db.doc(`/quiz/${quizId}/team/${teamId}`);
  document
    .get()
    .then((snapshot) => {
      if (!snapshot.exists) {
        return res.status(404).send();
      }
      const { imageFileName } = snapshot.data();
      deleteStorage(`team/${imageFileName}`);
      return document.delete().then(() => res.json({ message: 'Delete successful' }));
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}
