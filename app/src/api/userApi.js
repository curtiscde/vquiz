import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.API_URL;

// eslint-disable-next-line import/prefer-default-export
export function login(fields) {
  return fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(fields),
  })
    .then(handleResponse)
    .catch(handleError);
}
