import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import { useState } from "react";
import { useGetUsersQuery } from "scenes/users/usersApiSlice";
import Footer from "components/Footer";

const DashLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data } = useGetUsersQuery();

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
        <Box flexGrow={1}>
          <Footer></Footer>
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;
