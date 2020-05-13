import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators'

export default function (req, res) {
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
