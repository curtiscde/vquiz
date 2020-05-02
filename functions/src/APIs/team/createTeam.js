import { isEmpty } from '../../util/validators';

export function createTeam(req, res) {
  if (isEmpty(req.body.quizId)) {
    return res.status(400).json({ quizId: 'Must not be empty' });
  }

  if (isEmpty(req.body.name)) {
    return res.status(400).json({ name: 'Must not be empty' });
  }

  const newTeam = {
    name: req.body.name,
  };




  return res.status(200).json({ ok: true });
}
