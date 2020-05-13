import { db } from '../util/admin';
import { isEmpty } from '../util/validators';

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
    createdAt: new Date().toISOString(),
    date: quizDate,
    title: req.body.title,
    userId: req.user.uid,
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
      if (doc.data().userId !== req.user.uid) {
        return res.status(403).json({ error: 'Unauthorized' });
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
  return document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404);
      }
      if (doc.data().userId !== req.user.uid) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      return document;
    })
    .then((doc) => doc.update({
      title: req.body.title,
      date: quizDate,
    }))
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
