import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.API_URL;

export function login(fields) {
  return fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(fields),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getUser(accessToken) {
  return fetch(`${baseUrl}/api/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(handleResponse)
    .catch(handleError);
}
