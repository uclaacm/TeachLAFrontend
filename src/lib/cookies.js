function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getThemeFromCookie = () => {
  let theme = getCookie("theme");
  if (theme !== "") {
    return theme;
  } else {
    setCookie("theme", "dark", 365);
    return "dark";
  }
};

export const setThemeCookie = theme => {
  setCookie("theme", theme, 365);
};

export const toggleCookie = () => {
  if (getThemeFromCookie() === "light") {
    setCookie("theme", "dark", 365);
    return "dark";
  }
  setCookie("theme", "light", 365);
  return "light";
};
