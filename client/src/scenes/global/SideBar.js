import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { useContext, useState } from "react";
import { tokens } from "../../theme";

import InputBase from "@mui/material/InputBase";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: selected === title ? "white" : colors.grey[100],
        backgroundColor: selected === title ? colors.primary[500] : "transparent",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { address } = useAccount();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          background: `transparent !important`,
        },
        "& .pro-menu-item:hover": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Гермес
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <MenuItem>
            {/* USER */}
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center">
                  <img
                    alt="profile"
                    width="100px"
                    height="100px"
                    src={"../../assets/images/user.png"}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>

                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Admin
                  </Typography>
                  <Typography>{address}</Typography>
                </Box>
              </Box>
            )}
          </MenuItem>
            
            {/* Menu Items */}
            <Item
              title="Рабочая панель"
              to="/"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Создать граф знаний"
              to="/create"
              icon={<AddchartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Обозреватель"
              to="/explorer"
              icon={<ContentPasteSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

        </Menu>
      </ProSidebar>
    </Box>
  );
};
