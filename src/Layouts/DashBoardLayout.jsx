import { Outlet } from "react-router-dom";
import Header from "../component/HeaderComp/Header";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DashBoardLayout() {
  return (
    <>
      <motion.div className="p-2 min-h-screen max-h-full">
        <Header />
        <motion.div className="md:max-w-[1100px] p-2 w-full m-auto md:min-w-[100px] items-center
         md:h-[calc(100vh-5rem)]   min-h-[200px] md:max-h-screen overflow-auto">
          <ToastContainer position="top-left" autoClose={3000} />
          <Outlet />
        </motion.div>
      </motion.div>
    </>
  );
}

export default DashBoardLayout;
