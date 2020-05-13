import { db } from '../../util/admin';

export default function (req, res) {
  const document = db.doc(`/quiz/${req.params.quizId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404);
      }
      if (doc.data().userId !== req.user.uid) {
        return res.status(403).json({ error: 'Unauthorised' });
      }
      return document.delete();
    })
    .then(() => {
      res.json({ message: 'Delete successful' });
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}
