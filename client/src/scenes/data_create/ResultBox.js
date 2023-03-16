import { Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
import { useEffect } from "react";
import { GraphBox } from "../../components/Graph.js";
import { LogBox } from "../../components/LogBox.js";

export const ResultBox = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {}, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        m="30px 0 0 10%"
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p="0 5% 0 0"
      >
        <GraphBox />

        <Grid item md={12}>
          <LogBox />
        </Grid>
      </Grid>
      
      
      
    </>
  );
};
