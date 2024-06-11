/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gray: {
          "100": "#8a8c8e",
          "200": "#767676",
          "300": "#252930",
          "400": "#232733",
          "500": "#262626",
          "600": "#212529",
          "700": "#222",
          "800": "rgba(0, 0, 0, 0.15)",
          "900": "rgba(255, 255, 255, 0.01)",
          "1000": "rgba(0, 0, 0, 0.1)",
          "1100": "rgba(0, 0, 0, 0.5)",
          "1200": "rgba(255, 255, 255, 0)",
        },
        lightgray: {
          "100": "#ced4da",
          "200": "#cfd2d5",
          "300": "#d0d0d0",
        },
        dimgray: {
          "100": "#737373",
          "200": "#5c5d5e",
        },
        lightseagreen: {
          "100": "#36c4b0",
          "200": "#1daa97",
        },
        black: "#000",
        whitesmoke: {
          "100": "#f9f9f9",
          "200": "#f8f4f0",
          "300": "#eee",
          "400": "#e9ecef",
          "500": "#e7eaed",
          "600": "#e7e9ed",
        },
        royalblue: {
          "100": "#007bff",
          "200": "#0075ff",
        },
        slategray: {
          "100": "#6c757d",
          "200": "#5d6778",
        },
        gold: "#ffc107",
        darkslategray: {
          "100": "#495057",
          "200": "#333",
          "300": "#252b2c",
          "400": "rgba(54, 65, 88, 0.2)",
        },
        cornflowerblue: {
          "100": "#26a1ff",
          "200": "#2196f3",
          "300": "rgba(38, 161, 255, 0.09)",
        },
        lightslategray: "#818b99",
        steelblue: "#395b98",
        mediumseagreen: "#5cb377",
        darkgray: {
          "100": "#aaa",
          "200": "#9fa7b5",
        },
        ghostwhite: "#f5f6fe",
        lavenderblush: "#fdeded",
        firebrick: {
          "100": "#cc2b30",
          "200": "#a31515",
          "300": "#a5050a",
        },
        gainsboro: "#dee2e6",
        aliceblue: "#e8f0fe",
        crimson: "#dc3545",
        forestgreen: "#28a745",
      },
      spacing: {},
      fontFamily: {
        "source-sans-pro": "'Source Sans Pro'",
        montserrat: "Montserrat",
        poppins: "Poppins",
        inter: "Inter",
        nunito: "Nunito",
        roboto: "Roboto",
        "roboto-condensed": "'Roboto Condensed'",
      },
      borderRadius: {
        "3xs": "10px",
        "10xs-6": "2.6px",
        "base-2": "16.2px",
        "10xs": "3px",
        "5xs-2": "7.2px",
        "31xl": "50px",
        "10xs-5": "2.5px",
        "23xl": "42px",
      },
    },
    fontSize: {
      base: "16px",
      "3xl": "22px",
      lg: "18px",
      "4xs-6": "8.6px",
      "lgi-5": "19.5px",
      "37xl-9": "56.9px",
      "15xl": "34px",
      "27xl": "46px",
      "xs-2": "11.2px",
      "2xs-5": "10.5px",
      "lgi-2": "19.2px",
      "4xs": "9px",
      "41xl": "60px",
      "17xl": "36px",
      "29xl": "48px",
      xl: "20px",
      "31xl": "50px",
      "11xl": "30px",
      "21xl": "40px",
      "26xl": "45px",
      "lgi-3": "19.3px",
      "xl-6": "20.6px",
      "8xl": "27px",
      "4xl-2": "23.2px",
      lgi: "19px",
      sm: "14px",
      "xl-2": "20.2px",
      "5xl": "24px",
      mini: "15px",
      "lgi-8": "19.8px",
      "mini-2": "14.2px",
      "lgi-9": "19.9px",
      mid: "17px",
      "13xl": "32px",
      "7xl": "26px",
      "3xs-8": "9.8px",
      "sm-8": "13.8px",
      "sm-7": "13.7px",
      "sm-6": "13.6px",
      "sm-5": "13.5px",
      "sm-9": "13.9px",
      "mini-4": "14.4px",
      xs: "12px",
      inherit: "inherit",
    },
    screens: {
      mq1325: {
        raw: "screen and (max-width: 1325px)",
      },
      mq1225: {
        raw: "screen and (max-width: 1225px)",
      },
      lg: {
        max: "1200px",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq1000: {
        raw: "screen and (max-width: 1000px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq725: {
        raw: "screen and (max-width: 725px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
