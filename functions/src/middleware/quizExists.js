import { db, admin } from '../util/admin';

export default function (req, res, next) {
  const document = db.collection('quiz').doc(`${req.body.quizId}`);
  return document
    .get()
    .then((doc) => {
      doc.exists ? next() : res.status(404).send();
    });
}
