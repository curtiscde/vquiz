import firebase from 'firebase';
import config from '../util/config';

firebase.initializeApp(config.firebase);

export default function loginUser(req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => data.user.getIdToken())
    .then((token) => res.json({ token }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(403).json({ info: 'Incorrect credentials' });
    });
}
