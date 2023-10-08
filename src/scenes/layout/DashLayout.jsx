import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "components/Navbar";
// import Sidebar from "components/Sidebar";
import { useState } from "react";
import { useGetUsersQuery } from "scenes/users/usersApiSlice";
import Footer from "components/Footer";
// got rid of the outer div
// The outlet is replaced by the Dashboard component
const DashLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data } = useGetUsersQuery(); // ctrl alt and l for turbo log

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></Sidebar> */}
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
