function fieldIsValid(value) {
  if (!value || value.lenght < 3) return false;
  return true;
}

function emailIsValid(email) {
  const emailpattern = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  if (!email || !emailpattern.test(email)) return false;
  return true;
}

function passwordIsValid(password) {
  const passwordPattern = /[\S]{5,}/;
  if (!password || !passwordPattern.test(password)) return false;
  return true;
}

module.exports = {
  fieldIsValid,
  emailIsValid,
  passwordIsValid,
};
