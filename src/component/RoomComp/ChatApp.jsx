import { useEffect, useRef, useState } from "react";
import socketClient from "../../utility/Socket_Io";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MsgComp from "./MsgComp";
import useStore from "../../../Store";
import { IoIosSend } from "react-icons/io";
function ChatApp({ roomID }) {
  const [sendMessage, SetSendMsg] = useState("");
  const { msgData, setMsgData, userName } = useStore();
  const divRef = useRef();
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [msgData]);

  function handleSend() {
    if (!sendMessage.trim()) return;
    const newmsg = {
      username: userName,
      msg: sendMessage,
      isMe: true,
      roomID,
    };
    setMsgData(newmsg);
    socketClient.emit("newMsg", newmsg);
    SetSendMsg("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full p-2 md:h-[calc(100vh-8.9rem)] h-full grid grid-rows-12">
      <motion.div
        className="row-span-10 overflow-auto text-justify p-3"
        ref={divRef}
      >
        {msgData.map((m, idx) => (
          <MsgComp key={idx} username={m.username} msg={m.msg} isMe={m.isMe} />
        ))}
      </motion.div>

      <motion.div className="dark:shadow-xl rounded-xs shadow-xs dark:shadow-blue-500 shadow-yellow-950 row-span-2 w-full grid p-2 gap-2 grid-cols-5 items-center">
        <TextField
          className="col-span-4 w-full outline-none border-none"
          type="text"
          onKeyDown={handleKeyDown}
          value={sendMessage}
          onChange={(e) => SetSendMsg(e.target.value)}
          placeholder="message"
          variant="standard"
          autoComplete="off"
          InputLabelProps={{
            style: { color: "gray" },
          }}
          InputProps={{
            disableUnderline: true,
            className:
              "bg-transparent !text-black dark:!text-white !p-2 !outline-none !border-none placeholder-gray-400 font-bold",
          }}
        />
        <Button
          className="!col-span-1 !border-none p-1 !flex !justify-center !items-center hover:!bg-transparent"
          variant="outlined"
          onClick={handleSend}
        >
          <IoIosSend
            size={30}
            className="dark:!drop-shadow-2xl dark:!drop-shadow-green-800"
          />
        </Button>
      </motion.div>
    </div>
  );
}

export default ChatApp;
