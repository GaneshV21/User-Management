export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Please input your E-mail!";
  }
  if (!re.test(String(email).toLowerCase())) {
    return "The input is not a valid E-mail!";
  }
  return "";
};
