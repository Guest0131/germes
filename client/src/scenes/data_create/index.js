import {
  Typography,
  Box,
  useTheme,
  Container,
  IconButton,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { ResultBox } from "./ResultBox";
import { tokens } from "../../theme.js";

import { Header } from "../../components/Header.js";
import { getLinks } from "../../redux/features/rest/restSlice.js";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const CreateGraph = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [query, setQuery] = useState("");
  const restData = useSelector(state => state.rest)
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
        dispatch(getLinks({stringQuery : query}))
        setQuery("")
        console.log(restData)
    } catch (e) {
        console.log(e)
    }
  }

  return (
    <>
      <Box p="10px 0 0 20px">
        <Header
          title="Создание графа знаний"
          subtitle="Это твоё место для творчества"
        />
      </Box>

      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        m="0 5% 0 10%"
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Ваш поисковый запрос"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></InputBase>

        <IconButton type="button" sx={{ p: 1 }} onClick={handleSubmit}>
          <SearchOutlinedIcon />
        </IconButton>
      </Box>

      <Box display="flex" borderRadius="3px" m="50px 0 0 0">
        <ResultBox></ResultBox>
      </Box>
    </>
  );
};
