import { db, admin } from '../../util/admin';

function getTeamFromDoc(doc) {
  return {
    teamId: doc.id,
    name: doc.data().name,
    createdAt: doc.data().createdAt,
    imageFileName: doc.data().imageFileName,
  };
}

async function getImageDownloadUrl(imageFileName) {
  if (!imageFileName) {
    return null;
  }

  const file = admin.storage().bucket().file(`team/${imageFileName}`);

  return file.getSignedUrl({
    action: 'read',
    expires: new Date().getTime() + (60 * 60 * 1000),
  })
    .then((signedUrls) => signedUrls[0])
    .catch(() => null);
}

export default function (req, res) {
  const { quizId } = req.params;

  try {
    return db
      .collection('quiz')
      .doc(quizId)
      .collection('team')
      .get()
      .then((snapshot) => {
        const teams = [];
        snapshot.forEach((doc) => teams.push(getTeamFromDoc(doc)));
        return teams;
      })
      .then(async (teams) => {
        const t = await Promise.all(teams.map(async (team) => ({
          ...team,
          imageUrl: await getImageDownloadUrl(team.imageFileName),
        })));
        return res.status(200).json(t);
      });
  } catch (error) {
    return res.status(500).send();
  }
}
