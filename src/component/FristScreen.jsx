import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import useStore from "../../Store";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";
import socketClient from "../utility/Socket_Io";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function FristScreen() {
  const navigate = useNavigate();
  const {
    userName,
    setUserName,
    setAdmin,
    setSocketConnected,
    loading,
    setLoading,
  } = useStore();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (socketClient.connected) {
      socketClient.disconnect();
    }
    setSocketConnected(false);
    return () => {
      socketClient.off("connect");
      setLoading("null");
      setSocketConnected(true);
    };
  }, []);

  useEffect(() => {
    let time;
    if (!loading.match("null")) {
      time = setTimeout(() => {
        setError(
          <>
            Please{" "}
            <span
              onClick={refresh}
              className="underline text-xl cursor-pointer text-blue-500"
            >
              refresh
            </span>{" "}
            the page and try again to connect
          </>
        );
        setLoading("null");
        setRoomId("");
        setUserName("");
      }, 4000);
    }
    return () => {
      clearTimeout(time);
    };
  }, [loading]);

  function handleJoinOrCreate(type) {
    setLoading(type === "CreateButton" ? "create" : "join");
    if (!userName || !roomId) {
      toast.error("Please enter required details");
      setLoading("null");
      setError("");
      return;
    }
    socketClient.connect();
    socketClient.on("connect", () => {
      emitCheckValidate(type);
    });
    setSocketConnected(true);
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
        setAdmin(type === "CreateButton");
        navigate(`/Join_Room/${roomId}?isCreated=${type === "CreateButton"}`);
        setLoading("null");
        setError("");
      } else {
        toast.error("Room not available!");
        socketClient.disconnect();
        setSocketConnected(false);
        setLoading("null");
        setError("");
      }
    });
  }

  const refresh = () => {
    window.location.reload();
  };
  return (
    <motion.div className="md:h-full max-h-full md:w-full p-3 text-white flex items-center justify-center flex-col">
      <h2 className="text-red-500">{error}</h2>
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
            className="w-full md:w-fit disabled:!bg-gray-300 dark:disabled:!bg-gray-600 dark:disabled:!text-gray-400"
            disabled={loading === "create" || loading === "join"}
            onClick={() => handleJoinOrCreate("CreateButton")}
          >
            {loading === "create" ? (
              <ClipLoader size={30} color="blue" />
            ) : (
              "Create Room"
            )}
          </Button>

          <Button
            variant="contained"
            color="primary"
            disabled={loading === "create" || loading === "join"}
            className="w-full md:w-fit disabled:!bg-gray-300 dark:disabled:!bg-gray-600 dark:disabled:!text-gray-400"
            onClick={() => handleJoinOrCreate("JoinButton")}
          >
            {loading === "join" ? (
              <ClipLoader size={30} color="blue" />
            ) : (
              "Join Room"
            )}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default FristScreen;
