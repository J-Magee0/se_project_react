const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
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
export { getItems, addItem, deleteCard };
