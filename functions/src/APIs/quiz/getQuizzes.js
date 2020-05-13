import { db } from '../../util/admin';

export default function (req, res) {
  console.log('getQuizzes...');
  db
    .collection('quiz')
    .where('userId', '==', req.user.uid)
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      const quizzes = [];
      data.forEach((doc) => {
        quizzes.push({
          date: doc.data().date,
          quizId: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(quizzes);
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}