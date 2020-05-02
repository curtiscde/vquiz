import BusBoy from 'busboy';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { db, admin } from '../../util/admin';
import { isEmpty } from '../../util/validators';

function deleteImage(imageName) {
  const bucket = admin.storage().bucket();
  return bucket.file(imageName).delete()
    .then(() => ({}))
    .catch(() => ({}));
}

// eslint-disable-next-line consistent-return
export default function uploadImage(req, res) {
  const { quizId, teamId } = req.params;

  if (isEmpty(quizId)) {
    return res.status(400).json({ quizId: 'Must not be empty' });
  }
  if (isEmpty(teamId)) {
    return res.status(400).json({ teamId: 'Must not be empty' });
  }

  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  // eslint-disable-next-line consistent-return
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${quizId}-${teamId}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
    deleteImage(imageFileName);
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => (
        db.doc(`/quiz/${quizId}/team/${teamId}`)
          .update({
            imageFileName,
          })
      ))
      .then(() => res.json({ message: 'Image uploaded successfully' }))
      .catch((error) => res.status(500).json({ error: error.code }));
  });
  busboy.end(req.rawBody);
}
