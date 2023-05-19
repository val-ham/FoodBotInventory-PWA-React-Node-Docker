import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

import LeftSideMenu from "./LeftSideMenu";

const Navbar = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <Box mb={2}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flex: 1 }}>
            {props.title}
          </Typography>
          <IconButton size="large" color="inherit" aria-label="settings" onClick={() => alert("Settings not implemented yet")}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <LeftSideMenu open={drawerOpen} onClose={() => toggleDrawer(false)} />
    </Box>
  );
};

export default Navbar;
