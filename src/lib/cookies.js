/**
 * an internal helper function to get a cookie from the document.
 * almost word-for-word copied from https://www.w3schools.com/js/js_cookies.asp
 * @param {string} cname - the key value for the requested cookie
 * @return {string} the value of the requested key, "" for none set
 */

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * an internal helpder function to set a cookie in the document
 * almost word-for-word copied from https://www.w3schools.com/js/js_cookies.asp
 * @param {string} cname - the key value for the requested cookie
 * @param {string} cvalue - the value to set the cookie to
 * @param {number} exdays - the number of days until the cookie expires
 */

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * exported function that gets the current app theme from the theme cookie;
 * if none is set, returns dark and sets the cookie to dark
 * @returns {string} the current theme, or dark if the cookie doesn't exist
 */

export const getThemeFromCookie = () => {
  let theme = getCookie("theme");
  if (theme !== "") {
    return theme;
  } else {
    setCookie("theme", "dark", 365);
    return "dark";
  }
};

/**
 * exported function that sets the theme cookie to the input, with a one-year expiry date
 * @param {string} theme theme string to store in the cookie
 */

export const setThemeCookie = theme => {
  setCookie("theme", theme, 365);
};

/**
 * exported function that toggles the theme cookie to flip-flop its value from light to dark
 * if none is set, assumes that the user is currently in dark and switches to light
 * @returns {string} returns the current value of the theme cookie
 */

export const toggleCookie = () => {
  if (getThemeFromCookie() === "light") {
    setCookie("theme", "dark", 365);
    return "dark";
  }
  setCookie("theme", "light", 365);
  return "light";
};
