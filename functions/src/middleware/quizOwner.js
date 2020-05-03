import { db } from '../util/admin';

export default function (req, res, next) {
  const quizId = req.body.quizId || req.params.quizId;
  const userId = req.user.uid;

  if (!quizId) {
    return res.status(400).json({ quizId: 'missing' });
  }
  if (!userId) {
    return res.status(400).json({ userId: 'missing' });
  }

  const document = db.collection('quiz').doc(quizId);
  return document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).send();
      }
      return (doc.data().userId === userId)
        ? next()
        : res.status(403).json({ error: 'Unauthorized' });
    });
}
