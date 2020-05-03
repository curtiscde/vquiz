import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators';
import deleteStorage from '../../util/deleteStorage';

export default function removeImage(req, res) {
  const { quizId, teamId } = req.body;

  if (isEmpty(quizId)) {
    return res.status(400).json({ quizId: 'Must not be empty' });
  }
  if (isEmpty(teamId)) {
    return res.status(400).json({ teamId: 'Must not be empty' });
  }

  const doc = db.doc(`quiz/${quizId}/team/${teamId}`);

  return doc
    .get()
    .then((snapshot) => {
      const { imageFileName } = snapshot.data();
      deleteStorage(`team/${imageFileName}`);
      return doc.update({
        imageFileName: null,
      });
    })
    .then(() => res.send());
}
