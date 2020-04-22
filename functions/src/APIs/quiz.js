import { db } from '../util/admin';

export function getAllQuizzes(request, response) {
  db
    .collection('quiz')
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

export function getQuiz(req, res) {
  db
    .doc(`/quiz/${req.params.quizId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404);
      }
      const quizData = doc.data();
      quizData.id = doc.id;
      return res.json(quizData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}
