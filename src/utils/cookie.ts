export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

interface CookieProps {
  path?: string;
  expires?: string | number | Date;
  [key: string]: unknown;
}

export function setCookie(name: string, value: string, props: CookieProps = {}): void {
  const defaultProps: CookieProps = {
    path: "/",
  };

  const mergedProps = { ...defaultProps, ...props };

  let { expires } = mergedProps;

  if (typeof expires === "number") {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = mergedProps.expires = d;
  }

  if (expires && expires.toString) {
    mergedProps.expires = expires.toString();
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

export function deleteCookie(name: string): void {
  setCookie(name, "", { "max-age": -1 });
}
