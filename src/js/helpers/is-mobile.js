const isMobile = {
  android: () => navigator.userAgent.match(/android/i),
  blackBerry: () => navigator.userAgent.match(/blackberry/i),
  opera: () => navigator.userAgent.match(/opera mini/i),
  ios: () => navigator.userAgent.match(/iphone|ipad|ipod/i),
  any: () => (
      isMobile.android() ??
      isMobile.blackBerry() ??
      isMobile.opera() ??
      isMobile.ios()
    ),
};

export { isMobile };
