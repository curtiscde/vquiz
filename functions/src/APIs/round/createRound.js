import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators';

export default function (req, res) {
  const { quizId, name } = req.body;

  if (isEmpty(quizId)) {
    return res.status(400).json({ quizId: 'Must not be empty' });
  }

  if (isEmpty(name)) {
    return res.status(400).json({ name: 'Must not be empty' });
  }

  const newRound = {
    createdAt: new Date().toISOString(),
    name,
  };

  try {
    const teams = db
      .collection('quiz')
      .doc(quizId)
      .collection('round');

    return teams
      .where('name', '==', newRound.name)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          return res.status(400).json({ name: 'Already exists' });
        }
        return teams
          .add(newRound);
      })
      .then((team) => {
        newRound.id = team.id;
        return res.status(200).json(newRound);
      });
  } catch (error) {
    return res.status(500).send();
  }
}
