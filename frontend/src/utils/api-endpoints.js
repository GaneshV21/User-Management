export const BASE = "http://localhost:8002";

export const AUTH = {
  Login: `${BASE}/auth/v1/login`,
};

export const USER = {
  list: `${BASE}/users/v1/list`,
  create: `${BASE}/users/v1/create`,
  update: (id) => `${BASE}/users/v1/update/${id}`,
  delete: (id) => `${BASE}/users/v1/delete/${id}`,
};
