import { db } from '../../util/admin';

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
        snapshot.forEach((doc) => {
          teams.push({
            teamId: doc.id,
            name: doc.data().name,
            createdAt: doc.data().createdAt,
            imageUrl: doc.data().imageUrl ? doc.data().imageUrl : null,
          });
        });
        return res.status(200).json(teams);
      });
  } catch (error) {
    return res.status(500).send();
  }
}
