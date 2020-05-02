import firebase from 'firebase';
import { db } from '../../util/admin';
import { isEmpty } from '../../util/validators';

export function createTeam(req, res) {
  const { quizId, name } = req.body;

  if (isEmpty(quizId)) {
    return res.status(400).json({ quizId: 'Must not be empty' });
  }

  if (isEmpty(name)) {
    return res.status(400).json({ name: 'Must not be empty' });
  }

  const newTeam = {
    createdAt: new Date().toISOString(),
    name,
  };

  try {
    const teams = db
      .collection(`quiz`)
      .doc(quizId)
      .collection('team');

    return teams
      .where('name', '==', newTeam.name)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          return res.status(400).json({ name: 'Already exists ' });
        }
        return teams
          .add(newTeam)
      })
      .then((team) => {
        newTeam.id = team.id;
        res.status(200).json(newTeam);
      });

  } catch (error) {
    return res.status(500).send();
  }
}
