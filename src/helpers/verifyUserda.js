export const verifyUserdata = (userData) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!userData.displayName || userData.displayName.length === 0) {
    setShowUsernameError("Fill in your username");
  }

  if (!userData.email || userData.email.length === 0) {
    setShowEmailError("Fill in your email");
    return false;
  }

  if (!emailRegex.test(userData.email)) {
    setShowEmailError("Please enter a valid email address");
    return false;
  }
  if (emailRegex.test(userData.email)) {
    setShowEmailError(null);
  }

  if (!userData.password) {
    setShowPasswordError("Fill in your password");
    return false;
  }

  if (userData.password.length < 8) {
    setShowPasswordError("Password must be at least 8 characters");
    return false;
  }
  return true;
};
