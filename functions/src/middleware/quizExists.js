import { db } from '../util/admin';

export default function (req, res, next) {
  const quizId = req.body.quizId || req.params.quizId;
  const document = db.collection('quiz').doc(quizId);
  return document
    .get()
    .then((doc) => (doc.exists ? next() : res.status(404).send()));
}
