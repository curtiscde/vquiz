import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.API_URL;

// eslint-disable-next-line import/prefer-default-export
export function getQuizzes() {
  return fetch(`${baseUrl}/quizzes`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })
    .then(handleResponse)
    .catch(handleError);
}
