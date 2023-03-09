import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";

import { Header } from "../../components/Header.js";

export const DashBoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p="10px 0 30px 20px">
      <Header
        title="Рабочая панель"
        subtitle="Основная страница"
      />
    </Box>
  );
};
