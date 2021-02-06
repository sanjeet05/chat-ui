// token
function _setToken(tokenObj) {
  localStorage.setItem("accessToken", tokenObj.accessToken);
  localStorage.setItem("expiresIn", tokenObj.expiresIn);
  if (tokenObj.refreshToken) {
    localStorage.setItem("refreshToken", tokenObj.refreshToken);
  }
}

function _getAccessToken() {
  return localStorage.getItem("accessToken");
}

function _getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

function _clearToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresIn");
}

// user
function _setUser(userObj) {
  const user = JSON.stringify(userObj);
  localStorage.setItem("user", user);
}

function _getUser() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  return user;
}

function _clearUser() {
  localStorage.removeItem("user");
}

//remember user
function _rememberEmail(email) {
  const userEmail = JSON.stringify(email);
  localStorage.setItem("rememberEmail", userEmail);
}

function _getEmail() {
  let email = localStorage.getItem("rememberEmail");
  email = JSON.parse(email);
  return email;
}

// all
function _clearAll() {
  // localStorage.clear();
  _clearUser();
  _clearToken();
}

const LocalStorageService = {
  setToken: _setToken,
  getAccessToken: _getAccessToken,
  getRefreshToken: _getRefreshToken,
  clearToken: _clearToken,
  setUser: _setUser,
  getUser: _getUser,
  rememberEmail: _rememberEmail,
  getEmail: _getEmail,
  clearUser: _clearUser,
  clearAll: _clearAll,
};

export default LocalStorageService;
