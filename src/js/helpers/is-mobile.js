const isMobile = {
  android: () => {
    return navigator.userAgent.match(/android/i);
  },
  blackBerry: () => {
    return navigator.userAgent.match(/blackberry/i);
  },
  opera: () => {
    return navigator.userAgent.match(/opera mini/i);
  },
  ios: () => {
    return navigator.userAgent.match(/iphone|ipad|ipod/i);
  },
  any: () => {
    return (
      isMobile.android() ??
      isMobile.blackBerry() ??
      isMobile.opera() ??
      isMobile.ios()
    );
  },
};

export { isMobile };
