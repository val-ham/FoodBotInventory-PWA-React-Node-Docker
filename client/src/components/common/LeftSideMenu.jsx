import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ icon: Icon, text, navigateTo, action }) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={navigateTo ? () => navigate(navigateTo) : action}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const menuItems = [
  { key: "Inventory", icon: InventoryIcon, text: "Inventory", navigateTo: "/" },
  { key: "Add", icon: AddCircleIcon, text: "Add", navigateTo: "/addItem" },
  { key: "Chef", icon: MenuBookIcon, text: "Chef", navigateTo: "/chef" },
];

const LeftSideMenu = ({ open, onClose }) => {
  const { logout } = useContext(AuthContext);

  const toggleDrawer = (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    onClose();
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        {menuItems.map((item) => (
          <MenuItem key={item.key} icon={item.icon} text={item.text} navigateTo={item.navigateTo} />
        ))}
      </List>
      <Divider />
      <List>
        <MenuItem key="Logout" icon={LogoutIcon} text="Logout" action={logout} />
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  );
};

export default LeftSideMenu;
