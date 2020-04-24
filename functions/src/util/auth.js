import { admin, db } from './admin';

export default function (req, res, next) {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1]; // eslint-disable-line prefer-destructuring
  } else {
    console.error('No token found'); // eslint-disable-line no-console
    return res.status(403).json({ error: 'Unauthorized' });
  }
  return admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db.collection('user').where('userId', '==', req.user.uid).limit(1).get();
    })
    .then((data) => {
      req.user.username = data.docs[0].data().username;
      return next();
    })
    .catch((err) => {
      console.error('Error verifying token', err); // eslint-disable-line no-console
      return res.status(403).json(err);
    });
}
