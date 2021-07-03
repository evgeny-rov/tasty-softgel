const palette = {
  lavender: '#C7BEFF',
  dark_lavender: '#574574',
  orange: '#FF4D8D',
  red: '#FE5C5C',
  black: '#040404',
  white: '#F5F5F5',
  gray: '#D3D3D3',
  dark_gray: '#555555',
};

const android_ripple_base = {
  borderless: true,
  color: palette.lavender,
};

const theme = {
  colors: {
    background: palette.black,
    primary: palette.white,
    secondary: palette.gray,
    secondary_dark: palette.dark_gray,
    accent: palette.lavender,
    accent_dark: palette.dark_lavender,
    accent2: palette.orange,
    attention: palette.red,
  },
  size: {
    s: 8,
    sm: 11,
    m: 14,
    l: 22,
    xl: 40,
  },
  icon_size: 14,
  configs: {
    ripple_xs: {
      ...android_ripple_base,
      radius: 16,
    },
    ripple_sm: {
      ...android_ripple_base,
      radius: 25,
    },
    ripple_xl: {
      ...android_ripple_base,
      radius: 45,
    },
    ripple_contained: {
      ...android_ripple_base,
      radius: 30,
      borderless: false,
    },
  },
};

export {theme};
