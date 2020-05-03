import { db, admin } from '../../util/admin';
import { isEmpty } from '../../util/validators';

function deleteImage(imageName) {
  const bucket = admin.storage().bucket();
  return bucket.file(imageName).delete()
    .then(() => ({}))
    .catch(() => ({}));
}

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
      deleteImage(`team/${imageFileName}`);
      return doc.update({
        imageFileName: null,
      });
    })
    .then(() => res.send());
}
