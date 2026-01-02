const baseUrl = "http://localhost:3001";

export const checkResponse = async (res) => {
  // attempt to parse JSON body, fall back to null
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  if (res.ok) {
    return data;
  }
  // reject with structured error: { status, body }
  return Promise.reject({ status: res.status, body: data });
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export function signup({ email, password, name, avatar }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

export function signin({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}
