export const BASE = process.env.REACT_APP_BACKEND_URL || "backend_url";

export const AUTH = {
  Login: `${BASE}/auth/v1/login`,
  Signup: `${BASE}/auth/v1/signup`,
};

export const USER = {
  list: `${BASE}/users/v1/list`,
  create: `${BASE}/users/v1/create`,
  update: (id) => `${BASE}/users/v1/update/${id}`,
  delete: (id) => `${BASE}/users/v1/delete/${id}`,
};
