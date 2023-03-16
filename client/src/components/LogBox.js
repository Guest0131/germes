import { Typography, Paper, List, useTheme } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { tokens } from "../theme.js";
import { useSelector, useDispatch } from "react-redux";
import {
  parserHabr,
  parserYoutube,
  parserCyberleninka,
} from "../redux/features/rest/linksSlice.js";

import { useEffect, useState } from "react";

export const LogBox = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { allLinks, isLoading, data, status } = useSelector((state) => state.links);
  const dispatch = useDispatch();

  useEffect(() => {
    for (var k in data) {
      if (k === "habr") {
        for (var l in data[k]) {
          if (!allLinks[data[k][l]].status) {
            dispatch(parserHabr(data[k][l]));
          }
        }
      } else if (k === "youtube") {
        for (l in data[k]) {
          if (!allLinks[data[k][l]].status) {
            dispatch(parserYoutube(data[k][l]));
          }
        }
      } else if (k === "cyberleninka") {
        for (l in data[k]) {
          if (!allLinks[data[k][l]].status) {
            dispatch(parserCyberleninka(data[k][l]));
          }
        }
      }
    }


  }, [data, allLinks]);
  return (
    <Paper style={{ maxHeight: 100, overflow: "auto" }}>
      <List sx={{ padding: "1% 1%" }}>
        {Object.keys(allLinks).length > 0  ? (
          Object.keys(allLinks).map((k) => {
            if (allLinks[k].status) {
              return <Typography>{k}</Typography>;
            }
          })
        ) : <Typography>{"Нет данных"}</Typography>}
      </List>
    </Paper>
  );
};
