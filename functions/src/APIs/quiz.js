import { db } from '../util/admin';

export default function getAllQuizzes(request, response) {
  db
    .collection('quizzes')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      const quizzes = [];
      data.forEach((doc) => {
        quizzes.push({
          quizId: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(quizzes);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
}
