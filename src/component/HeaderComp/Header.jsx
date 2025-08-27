import { motion, AnimatePresence } from "framer-motion";
import ToggleTheme from "./ToggleTheme";
import useStore from "../../../Store";
import socketClient from "../../utility/Socket_Io";
import { useEffect, useState } from "react";

function Header() {
  const { userName, admin, socketConnected } = useStore();
  const [info, setInfo] = useState("");

  useEffect(() => {
    const start = setTimeout(() => {
      setInfo(
        "If you press back or left Arrow (pc), then you will be logged out"
      );
    }, 1000);

    const end = setTimeout(() => {
      setInfo("");
    }, 10000);

    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, []);

  return (
    <div className="flex w-full justify-between p-2 items-center shadow-xs dark:shadow-none outline-amber-100 overflow-hidden shadow-blue-200 rounded-xl">
      <div className="font-bold md:text-xl text-2xs gap-2 w-full items-start flex flex-col">
        {admin && socketClient.connected && socketConnected ? (
          <span className="capitalize text-2xl text-blue-500 font-extrabold underline">
            {userName}
          </span>
        ) : (
          userName
        )}

        <AnimatePresence>
          {info && socketConnected && (
            <motion.span
              key="info"
              initial={{ x: -1000, opacity: 0, color: "blue" }}
              animate={{ x: 0, opacity: 1, color: "yellow" }}
              exit={{ x: 1000, opacity: 0, color: "red" }}
              transition={{ duration: 2, ease: "circInOut" }}
              className="dark:text-blue-400 text-gray-600"
            >
              {info}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <ToggleTheme />
    </div>
  );
}

export default Header;
