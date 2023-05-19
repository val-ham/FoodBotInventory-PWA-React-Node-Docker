import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Login from "./components/Login/Login/";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import AddItem from "./components/AddItem/AddItem";
import Chef from "./components/Chef/Chef";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import { ItemsProvider } from "./context/itemsContext";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "flex-start",
        minWidth: 250,
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ItemsProvider>
                <ProtectedRoute />
              </ItemsProvider>
            }
          >
            <Route index element={<Home />} />
            <Route path="addItem" element={<AddItem />} />
            <Route path="chef" element={<Chef />} />
          </Route>
          <Route path="login" element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="register" element={<PublicRoute />}>
            <Route index element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
