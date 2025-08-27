import { motion } from "framer-motion";
function MsgComp({ username, msg, isMe }) {
  return (
    <>
      <motion.div
        initial={{ x: isMe ? 1000 : -1000, opacity: 0 }}
        animate={{ x: 0, opacity: [0.1, 0.5, 1] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`w-full p-2 flex ${isMe ? "justify-end" : "justify-start"}`}
      >
        <div className="w-fit flex flex-col">
          <span className="font-bold text-blue-400">
            {isMe ? "You" : username}
          </span>
          <span className="text-justify dark:text-gray-300 text-gray-600 font-semibold">
            {msg}
          </span>
        </div>
      </motion.div>
    </>
  );
}

export default MsgComp;
