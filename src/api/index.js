import config from '../config';

function jsonToQueryString(json) {
  return `?${
    Object.keys(json).map((key) => `${encodeURIComponent(key)}=${
      encodeURIComponent(json[key])}`).join('&')}`;
}

export default function fetchApi(path = '', options = {}) {
  return fetch(config.apiEndpoint + path, options);
}

export const fetchTweetsApi = async (payload) => {
  const queryParams = payload && payload.location
    ? jsonToQueryString({
      lat: payload.location.lat,
      lng: payload.location.lng,
      query: payload.query,
    })
    : '';
  const authToken = window.localStorage.getItem('authToken');
  const response = await fetchApi(`/api/v1/auth/tweets${queryParams}`, { headers: { 'x-auth-token': authToken } });
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

export const fetchUserSession = async () => {
  const authToken = window.localStorage.getItem('authToken');
  const response = await fetchApi('/api/v1/auth/me', { headers: { 'x-auth-token': authToken } });
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};
