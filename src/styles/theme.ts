const palette = {
  lavender: '#C7BEFF',
  peach: '#FFC7DB',
  red: '#FE5C5C',
  white: '#F5F5F5',
  gray: '#D3D3D3',
};

const android_ripple_base = {
  borderless: true,
  color: palette.lavender,
};

const theme = {
  colors: {
    primary: palette.white,
    secondary: palette.gray,
    accent: palette.lavender,
    accent2: palette.peach,
    attention: palette.red,
  },
  size: {
    s: 8,
    sm: 11,
    m: 14,
    ml: 18,
    l: 22,
    xl: 40,
  },
  icon_size: 14,
  configs: {
    ripple_sm: {
      ...android_ripple_base,
      radius: 25,
    },
  },
};

export {theme};
