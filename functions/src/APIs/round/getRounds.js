import { db } from '../../util/admin';

function getRoundFromDoc(doc) {
  return {
    roundId: doc.id,
    name: doc.data().name,
    createdAt: doc.data().createdAt,
  };
}

export default function (req, res) {
  const { quizId } = req.params;

  try {
    return db
      .collection('quiz')
      .doc(quizId)
      .collection('round')
      .get()
      .then((snapshot) => {
        const rounds = [];
        snapshot.forEach((doc) => rounds.push(getRoundFromDoc(doc)));
        return res.status(200).json(rounds);
      });
  } catch (error) {
    return res.status(500).send();
  }
}
