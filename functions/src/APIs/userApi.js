import { db } from '../util/admin';

export function getUser(req, res) {
  db
    .collection('user')
    .where('userId', '==', req.user.uid)
    .limit(1)
    .get()
    .then((snapshot) => {
      if (snapshot.docs[0].data().userId !== req.user.uid) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      const { username } = snapshot.docs[0].data();
      return res.json({
        username,
      });
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).json({ error: err.code });
    });
}
