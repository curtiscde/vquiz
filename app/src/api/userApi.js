import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.API_URL;

export function login(fields) {
  return fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(fields),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getUser(accessToken) {
  return fetch(`${baseUrl}/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(handleResponse)
    .catch(handleError);
}
