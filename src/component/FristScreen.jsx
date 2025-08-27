import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import useStore from "../../Store";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";
import socketClient from "../utility/Socket_Io";
import { toast } from "react-toastify";
function FristScreen() {
  const navigate = useNavigate();
  const { userName, setUserName, setAdmin, setSocketConnected } = useStore();
  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    socketClient.disconnect(true);
    setSocketConnected(false);
  }, []);

  function handleJoinOrCreate(type) {
    if (!userName || !roomId) return;

    if (!socketClient.connected) {
      socketClient.connect();
      setSocketConnected(true);
      socketClient.once("connect", () => {
        emitCheckValidate(type);
      });
    } else {
      emitCheckValidate(type);
    }
  }

  function emitCheckValidate(type) {
    socketClient.emit("CheckValidate", {
      RoomName: roomId,
      iscreate: type === "CreateButton",
    });

    socketClient.once("check", (valid) => {
      if (valid) {
        socketClient.emit("join-room", {
          RoomName: roomId,
          userName,
          isCreated: type === "CreateButton",
        });
        if (type === "CreateButton") setAdmin(true);
        else setAdmin(false);
        navigate(`/Join_Room/${roomId}?isCreated=${type === "CreateButton"}`);
      } else {
        toast.error("Room not UnAvailable!");
        socketClient.disconnect(false);
        setSocketConnected(false);
      }
    });
  }

  return (
    <>
      <motion.div className="md:h-full max-h-full md:w-full p-3 text-white flex items-center justify-center">
        <motion.div className="rounded-lg p-5 md:p-2 shadow-2xl dark:shadow-amber-100 shadow-blue-900 md:min-w-[400px] md:max-w-[700px] min-w-[350px] max-w-[500px]">
          <InputForm
            setUserName={setUserName}
            userName={userName}
            setRoomId={setRoomId}
            roomId={roomId}
          />
          <motion.div className="flex gap-3 mt-4 items-center md:justify-between flex-col md:flex-row w-full md:p-3">
            <Button
              variant="contained"
              color="primary"
              className="w-full md:w-fit"
              onClick={() => handleJoinOrCreate("CreateButton")}
            >
              create Room
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="w-full md:w-fit"
              onClick={() => handleJoinOrCreate("JoinButton")}
            >
              Join Room
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default FristScreen;
