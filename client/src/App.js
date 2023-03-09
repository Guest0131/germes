import { ColorModeContext, useMode, tokens } from "./theme.js";
import { CssBaseline, ThemeProvider, Button, Grid, Box, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { DashBoard } from "./scenes/dashboard";
import { CreateGraph } from "./scenes/data_create/index.js";

import { TopBar } from "./scenes/global/TopBar";
import { SideBar } from "./scenes/global/SideBar.js";


function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isConnected ? (
            <>
              <SideBar />
              <main className="content">
                <TopBar logout={disconnect} />

                <Routes>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/create" element={<CreateGraph />} />
                </Routes>
              </main>
            </>
          ) : (
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
                  display: 'flex'
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
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
