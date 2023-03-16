import { useMode, tokens } from "../../theme.js";
import { Button, Grid, Box, Typography } from "@mui/material";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const LoginForm = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box
        bgcolor={colors.primary[400]}
        width="20%"
        height="20%"
        sx={{
          display: "flex",
        }}
      >
        <Typography variant="h3" textAlign="center" m="15% 0">
          Авторизуйтесь через ваше приложение MetaMask
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#1a237e",
          }}
          onClick={connect}
        >
          Войти
        </Button>
      </Box>
    </Grid>
  );
};
