///NEW blue green theme
export const tokensDark = {
  primary: {
    50: "#edfcfe",
    100: "#d2f5fb",
    200: "#abebf6",
    300: "#71daef",
    400: "#30c0e0",
    500: "#16b0d4",
    600: "#1484a6",
    700: "#176a87",
    800: "#1c566e",
    900: "#1b495e",
    950: "#0c2f40",
  },
  secondary: {
    50: "#ebfef6",
    100: "#cffce8",
    200: "#a3f7d5",
    300: "#68edc0",
    400: "#4ae0b2",
    500: "#08c18f",
    600: "#009d75",
    700: "#007e60",
    800: "#02634e",
    900: "#025242",
    950: "#002e26",
  },
  main: {
    50: "#ebfffd",
    100: "#cefffd",
    200: "#a2fffd",
    300: "#63fdfc",
    400: "#1cf2f4",
    500: "#00cace",
    600: "#03abb7",
    700: "#0a8794",
    800: "#126c78",
    900: "#145965",
    950: "#063c46",
  },
};

/// reverses the token colors
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// this is to make changing the font easier
const font = ["Roboto", "sans-serif"];
const font2 = ["Montserrat", "sans-serif"];

// mui theme settings
// so this is the theme object directly
// i can simply set the theme colors here

// background deep greens = #001f1e, 2 #0f2727 another dark green to try: 233220
// primary: dark brown : #5f4126
// secondary: champage: #F7E7CE
// neutral: deeper champagne: DCC5AF
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: "#3e2723",
              light: "513d39",
            },
            secondary: {
              main: "#DCC5AF",
              light: "#503933",
            },
            neutral: {
              main: "#b57d5a",
            },
            background: {
              default: "#001f1e",
              alt: "#0e534e",
            },
            warning: {
              main: "#001f1e",
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.main[50],
              light: tokensDark.main[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.main,
              main: tokensDark.main[500],
            },
            background: {
              default: tokensDark.main[0],
              alt: tokensDark.main[50],
            },
          }),
    },
    typography: {
      fontFamily: font.join(","),
      fontSize: 12,
      h1: {
        fontFamily: font2.join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: font2.join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: font2.join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: font.join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: font.join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: font.join(","),
        fontSize: 14,
      },
    },
  };
};
