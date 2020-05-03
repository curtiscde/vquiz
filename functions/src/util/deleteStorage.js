import { admin } from './admin';

export default function (filePath) {
  const bucket = admin.storage().bucket();
  return bucket.file(filePath).delete()
    .then(() => ({}))
    .catch(() => ({}));
}
