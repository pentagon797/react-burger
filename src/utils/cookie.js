export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1")}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props = {}) {
  const defaultProps = {
    path: "/",
  };
  const mergedProps = { ...defaultProps, ...props };

  let { expires } = mergedProps;
  if (typeof expires === "number") {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = mergedProps.expires = d;
  }
  if (expires && expires.toUTCString) {
    mergedProps.expires = expires.toUTCString();
  }

  const propStrings = Object.entries(mergedProps).map(([key, value]) => {
    if (value === true) {
      return key;
    }
    return `${key}=${value}`;
  });
  const propString = propStrings.join("; ");

  const encodedValue = encodeURIComponent(value);
  const cookieString = `${name}=${encodedValue}; ${propString}`;
  document.cookie = cookieString;
}

export function deleteCookie(name) {
  setCookie(name, "", { "max-age": -1 });
}
