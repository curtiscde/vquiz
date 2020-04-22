const { db } = require('../util/admin');

exports.getAllQuizzes = (request, response) => {
  db
    .collection('quizzes')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let quizzes = [];
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
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
