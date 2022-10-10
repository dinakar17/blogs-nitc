import { createTheme } from "@mui/system";

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "hsl(230, 17%, 14%)",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "hsl(0, 0%, 100%)",
    },
  },
});
