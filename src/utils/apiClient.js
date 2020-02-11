import io from "flyio";

const payload = (function() {
  let accessToken = "";

  const setToken = function(token) {
    if (token && typeof token === "string") {
      accessToken = token;
      return true;
    }

    accessToken = "";
  };

  const get = function(url, params, callback, onError) {
    io.get(url, {
      access_token: accessToken,
      ...params
    })
      .then(res => callback(res))
      .catch(err => onError(err));
  };

  return {
    get,
    setToken
  };
})();

export default payload;
