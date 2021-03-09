const palette = {
  lavender: '#b794d8',
  dark_lavender: '#574574',
  orange: '#FF9494',
  black: '#040404',
  white: '#F5F5F5',
  gray: '#888888',
};

const android_ripple_base = {
  borderless: true,
  color: palette.dark_lavender,
};

const theme = {
  colors: {
    background: palette.black,
    primary: palette.white,
    secondary: palette.gray,
    accent: palette.lavender,
    accent2: palette.orange,
  },
  size: {
    s: 8,
    sm: 11,
    m: 16,
    l: 22,
    xl: 40,
  },
  configs: {
    ripple_sm: {
      ...android_ripple_base,
      radius: 25,
    },
    ripple_xl: {
      ...android_ripple_base,
      radius: 50,
    },
    ripple_contained: {
      ...android_ripple_base,
      radius: 30,
      borderless: false,
    },
  },
};

export {theme};
