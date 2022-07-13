export interface Theme {
  base?: any;
  text?: any;
  height?: any;
  padding?: any;
}
export const DarkTheme: Theme = {
  base: {
    sidebar: "#E2E2E2",
    navbarbackground: "#1E1E1E",
    navbar: "#3E3E3E",
    content: '#FFFFFF',
    background: '#F0F0F0',
    header: '#464646',
    footer: "#363636"
  },
  status: {
      danger: "#FF4444",
      warning: "#FFBB33",
      success: "#00C851",
      info: "#33B5E5"
  },
  header: {
      sidebar: "#E06E1B",
  },
  container: {
      sidebar: "#FCFCFC",
  },
  text: {
    main: "#FFFFFF",
    other: "#000000",
  },
  height: {
    topContent: "95px",
  },
  padding: {
    content: "20px 0px",
  },
  url: {
      color: "#0000FF",
  },
  submission_background: {
      success: "#cfefcf",
      warning: "#ed9d9d"
  }
};
