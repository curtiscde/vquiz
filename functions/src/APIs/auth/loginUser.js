import firebase from 'firebase';
import { validateLoginData } from '../../util/validators';

export default function (req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  return firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => data.user.getIdToken())
    .then((token) => res.json({ token }))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      return res.status(403).json({ info: 'Incorrect credentials' });
    });
}
