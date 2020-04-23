import { db } from '../util/admin';
import { isEmpty } from '../util/validators';

export function getAllQuizzes(req, res) {
  db
    .collection('quiz')
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
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}

export function createQuiz(req, res) {
  if (isEmpty(req.body.title)) {
    return res.status(400).json({ title: 'Must not be empty' });
  }

  if (isEmpty(req.body.date)) {
    return res.status(400).json({ date: 'Must not be empty' });
  }

  let quizDate;
  try {
    quizDate = new Date(req.body.date).toISOString();
  } catch (err) {
    return res.status(400).json({ date: 'Invalid' });
  }

  const item = {
    title: req.body.title,
    date: quizDate,
    createdAt: new Date().toISOString(),
  };

  return db
    .collection('quiz')
    .add(item)
    .then((doc) => {
      const resItem = item;
      resItem.id = doc.id;
      return res.json(resItem);
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: 'Something went wrong' });
    });
}

export function deleteQuiz(req, res) {
  const document = db.doc(`/quiz/${req.params.quizId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404);
      }
      return document.delete();
    })
    .then(() => {
      res.json({ message: 'Delete successfull' });
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}

export function editQuiz(req, res) {
  if (isEmpty(req.body.title)) {
    return res.status(400).json({ title: 'Must not be empty' });
  }

  if (isEmpty(req.body.date)) {
    return res.status(400).json({ date: 'Must not be empty' });
  }

  let quizDate;
  try {
    quizDate = new Date(req.body.date).toISOString();
  } catch (err) {
    return res.status(400).json({ date: 'Invalid' });
  }

  const document = db.collection('quiz').doc(`${req.params.quizId}`);
  return document.update({
    title: req.body.title,
    date: quizDate,
  })
    .then(() => {
      res.json({ message: 'Updated successfully' });
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({
        error: err.code,
      });
    });
}
