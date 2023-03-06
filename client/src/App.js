import { ColorModeContext, useMode } from './theme.js'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { DashBoard } from './scenes/dashboard'
import { TopBar } from './scenes/global/TopBar'
import { SideBar } from './scenes/global/SideBar.js'

function App() {

  const [theme, colorMode] =useMode();
  const [auth, setAuth] = useState(null);

  return (
    <ColorModeContext.Provider  value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <TopBar />
          
          <Routes>
            <Route path="/" element={<DashBoard />} />
          </Routes>
        </main>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
