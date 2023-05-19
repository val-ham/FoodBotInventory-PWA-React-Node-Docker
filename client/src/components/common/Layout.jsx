import Navbar from "./Navbar";
import BottomNavBar from "./BottomNavBar";
import Box from "@mui/material/Box";

const Layout = ({ title, children, bottomNavValue }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar title={title} />
      {children}
      <BottomNavBar value={bottomNavValue} />
    </Box>
  );
};

export default Layout;
