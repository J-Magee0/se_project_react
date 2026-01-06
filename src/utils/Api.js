const baseUrl = "http://localhost:3001";

export const checkResponse = async (res) => {
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  if (res.ok) {
    return data;
  }
  return Promise.reject({ status: res.status, body: data });
};
// special function for fetching and checking responses not to duplicate it in every request
export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

function getItems() {
  return request(`${baseUrl}/items`);
}

function deleteCard(_id) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function addCardLike(id) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(id) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function updateUser({ name, avatar }) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

function signup({ email, password, name, avatar }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, avatar }),
  });
}

function signin({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export {
  getItems,
  addItem,
  deleteCard,
  addCardLike,
  removeCardLike,
  updateUser,
};
