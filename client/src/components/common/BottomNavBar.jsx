import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";

export default function BottomNavBar({ value }) {
  return (
    <Box>
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction label="Inventory" icon={<InventoryIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Add" icon={<AddCircleIcon />} component={Link} to="/addItem" />
        <BottomNavigationAction label="Chef" icon={<MenuBookIcon />} component={Link} to="/chef" />
      </BottomNavigation>
    </Box>
  );
}
