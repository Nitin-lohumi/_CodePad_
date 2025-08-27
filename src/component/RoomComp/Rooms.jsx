import socketClient from "../../utility/Socket_Io";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SelectComp from "./SelectComp";
import Select from "@mui/material/Select";
import EditorComp from "./EditorComp";
import useStore from "../../../Store";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ChatApp from "./ChatApp";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import OutPut from "./OutPut";
import UserActive from "./UserActive";
function Rooms() {
  const {
    userName,
    setZoomIn,
    setZoomOut,
    theme,
    setTheme,
    setMsgData,
    isTrueArr,
    setisTrue,
    active,
    setActive,
    setUserName,
    Language,
    setLanguage,
  } = useStore();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const params = useParams();
  const RoomName = params.roomID;
  const isCreated = query.get("isCreated");
  const [code, setCode] = useState(`// JavaScript starter code
function hello() {
  console.log("Hello JavaScript!");
}
hello();`);
  console.log(active);
  console.log(code);
  useEffect(() => {
    socketClient.emit("totalUsers", RoomName);

    socketClient.on("init-code", (serverCode) => {
      setCode(serverCode);
    });

    socketClient.on("getUsers", (activeUser) => {
      setActive(activeUser);
    });

    socketClient.on("changelanguage", (lang) => {
      setLanguage(lang);
    });

    socketClient.on("code-change", (newCode) => {
      setCode(newCode);
    });

    socketClient.on("getMsg", ({ username, roomID, msg }) => {
      const newmsg = {
        username,
        msg,
        isMe: false,
        roomID,
      };
      setMsgData(newmsg);
    });

    socketClient.on("runing", (isRun) => {
      if (isRun) {
        setisTrue({
          isOutputOpen: true,
          isChatopen: false,
          isACtivePeopleBox: false,
        });
        toast.info(" Admin change Page to  RUN Page ");
      }
    });

    const handleBeforeUnload = () => {
      console.log("backpress");
      socketClient.emit("leave-room", {
        RoomName,
        userName,
      });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      setUserName("");
      toast.info("You are disconnected");
      socketClient.emit("totalUsers", RoomName);
      socketClient.emit("leave-room", { RoomName, userName });
      socketClient.off("init-code");
      socketClient.off("language");
      socketClient.off("userJoined");
      socketClient.off("code-change");
      socketClient.off("runing");
      socketClient.off("getMsg");
      socketClient.off("userleft");
      window.removeEventListener("beforeunload", handleBeforeUnload);
      navigate("/");
    };
  }, [RoomName, userName]);

  useEffect(() => {
    if (!RoomName || !userName || !socketClient.connected) {
      navigate("/");
      socketClient.disconnect(true);
    }
  }, [RoomName, userName, socketClient.connected]);

  function handleChange(value) {
    setCode(value);
    socketClient.emit("code-change", { RoomName, code: value });
  }
  console.log(isTrueArr);
  return (
    <motion.div className="h-full p-2 md:max-h-full md:min-h-10  md:w-auto md:grid md:grid-cols-3 flex flex-col dark:bg-gray-800 md:gap-2 shadow-2xl bg-gray-50  shadow-amber-600 dark:border-0">
      <motion.div className="dark:shadow-xl shadow-xs shadow-blue-800 dark:shadow-blue-600 md:col-span-2 md:max-h-[calc(100vh-10rem)] min-h-full md:min-w-96 md:max-w-[100%] rounded-2xl">
        <motion.div className="flex md:items-center md:justify-between justify-center mb-1 dark:outline-none outline-amber-100  outline-1 rounded-2xl">
          <SelectComp isCreated={isCreated} />
          <div>
            <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
              <Select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white !font-bold dark:!bg-gray-800 dark:!text-white"
                MenuProps={{
                  PaperProps: {
                    className: "dark:!bg-gray-800 dark:!text-white !mt-1",
                  },
                }}
              >
                <MenuItem
                  value={"dark"}
                  className={`dark:!text-white hover:!bg-green-600 ${
                    theme === "dark"
                      ? "dark:!bg-blue-500 bg-blue-400"
                      : "dark:!bg-gray-800"
                  }`}
                >
                  dark
                </MenuItem>
                <MenuItem
                  value={"light"}
                  className={`dark:!text-white hover:!bg-green-600 ${
                    theme === "light"
                      ? "dark:!bg-blue-500 bg-blue-400"
                      : "dark:!bg-gray-800"
                  }`}
                >
                  light
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="md:flex gap-1 md:items-end p-1 ">
            <div
              onClick={setZoomIn}
              className="hover:bg-green-500 shadow-xs shadow-amber-600  transition p-2 cursor-pointer"
            >
              <FaSearchPlus size={16} />
            </div>
            <div
              onClick={setZoomOut}
              className="hover:bg-blue-800 shadow-xs shadow-blue-800  transition p-2 cursor-pointer"
            >
              <FaSearchMinus size={16} />
            </div>
          </div>
        </motion.div>
        <motion.div className="md:overflow-auto md:max-h-[calc(100vh-10.4rem)] rounded-2xl min-h-50rem max-h-96 border-amber-400 md:min-h-[calc(100vh-18rem)]">
          <EditorComp
            handleChange={handleChange}
            code={code}
            RoomName={RoomName}
            setCode={setCode}
          />
        </motion.div>
      </motion.div>
      <motion.div className="col-span-1 w-full shadow-xs shadow-blue-500 ">
        <motion.div className="w-fulls shadow-2xs shadow-green-400 flex justify-evenly sticky top-0 left-0">
          <Button
            className={`w-full ${
              isTrueArr.isOutputOpen &&
              "dark:!bg-blue-700 !bg-amber-200 dark:!text-white"
            }`}
            onClick={() => {
              setisTrue({
                isOutputOpen: true,
                isChatopen: false,
                isACtivePeopleBox: false,
              });
              socketClient.emit("isCodeRun", {
                RoomName,
                socketId: socketClient.id,
              });
            }}
          >
            Run
          </Button>

          <Button
            className={`w-full ${
              isTrueArr.isChatopen &&
              "dark:!bg-blue-700 !bg-amber-200 dark:!text-white"
            }`}
            onClick={() =>
              setisTrue({
                isOutputOpen: false,
                isChatopen: true,
                isACtivePeopleBox: false,
              })
            }
          >
            Chats
          </Button>

          <Button
            className={`w-full ${
              isTrueArr.isACtivePeopleBox &&
              "dark:!bg-blue-700 !bg-amber-200 dark:!text-white"
            }`}
            onClick={() => {
              setisTrue({
                isOutputOpen: false,
                isChatopen: false,
                isACtivePeopleBox: true,
              });
              socketClient.emit("totalUsers", RoomName);
            }}
          >
            User
          </Button>
        </motion.div>
        <motion.div className="w-full">
          {isTrueArr.isOutputOpen && (
            <OutPut code={code} language={Language} roomID={RoomName} />
          )}
          {isTrueArr.isChatopen && (
            <ChatApp userName={userName} roomID={RoomName} />
          )}
          {isTrueArr.isACtivePeopleBox && <UserActive roomID={RoomName} />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Rooms;
