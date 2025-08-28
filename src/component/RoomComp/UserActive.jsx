import { useEffect, useState } from "react";
import socketClient from "../../utility/Socket_Io";
import useStore from "../../../Store";
import { motion } from "framer-motion";
function UserActive() {
  const { active, setActive } = useStore();
  const [filteruser, setfilteruser] = useState([]);
  const [isloading, setloading] = useState(false);
  useEffect(() => {
    if (!socketClient) return;
    setloading(true);
    socketClient.on("getUsers", (activeUser) => {
      setActive(activeUser);
      setfilteruser(active?.filter((user) => user.id !== socketClient.id));
    });
    setloading(false);
    return () => {
      socketClient.off("getUsers");
    };
  }, []);
  return (
    <div className="p-3 rounded h-80 md:h-[calc(100vh-8.9rem)] overflow-auto">
      {isloading ? (
        <>loading.... users</>
      ) : (
        <>
          <h2 className="font-bold mb-2">
            Active Users ({filteruser?.length})
          </h2>
          <motion.ul className="list-decimal pl-6 p-2">
            {filteruser?.map((user, idx) => (
              <motion.li
                initial={{
                  x: idx % 2 == 0 ? 500 : -500,
                  scale: [0.1, 0.7, 0.9],
                  opacity: 0,
                }}
                animate={{ x: 0, scale: [0.5, 0.9, 1], opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                key={idx}
                className="text-green-500 text-xl mt-2 mb-2 p-2 shadow-xs rounded-xl shadow-green-500"
              >
                {user.userName}
              </motion.li>
            ))}
          </motion.ul>
        </>
      )}
    </div>
  );
}
export default UserActive;
