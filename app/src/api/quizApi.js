import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.API_URL;

export function getQuizzes() {
  return fetch(`${baseUrl}/quizzes`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function createQuiz(quiz) {
  return fetch(`${baseUrl}/quiz`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(quiz),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getQuiz(quizId) {
  return fetch(`${baseUrl}/quiz/${quizId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })
    .then(handleResponse)
    .catch(handleError);
}
