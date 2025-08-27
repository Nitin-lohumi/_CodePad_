import Button from "@mui/material/Button";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../../../Store";
import socketClient from "../../utility/Socket_Io";
import { ClipLoader } from "react-spinners";
import { VscRunAll } from "react-icons/vsc";
function OutPut({ code, language, roomID }) {
  const [loading, setLoading] = useState(false);
  const { setRunOutput, runOutput } = useStore();
  console.log(language);
  function getLanID() {
    switch (language) {
      case "javascript":
        return 63;
      case "java":
        return 62;
      case "python":
        return 71;
      default:
        return 54;
    }
  }

  useEffect(() => {
    socketClient.on("codeListen", ({ output, error }) => {
      setRunOutput({ output, error });
    });
    socketClient.on("getloading", (load) => {
      console.log(load);
      setLoading(load);
    });
    return () => {
      socketClient.off("codeListen");
      socketClient.off("getloading");
    };
  }, []);

  async function handleOuput() {
    console.log("ascbak");
    try {
      socketClient.emit("runLoading", { load: true, roomID });
      setLoading(true);
      const output = await axios.post("http://localhost:4000/RunCode", {
        code,
        languageId: getLanID(),
      });
      console.log(output.data);

      setRunOutput(output.data);
      socketClient.emit("outputCode", {
        output: output.data.output,
        error: output.data.error,
        roomID,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      socketClient.emit("runLoading", { load: false, roomID });
    }
  }
  console.log(runOutput);
  return (
    <>
      <AnimatePresence>
        <motion.div className="w-full md:h-[calc(100vh-11rem)] h-full grid grid-rows-12">
          <div
            className={`row-span-1 p-1 dark:border-b-2 h-full flex justify-end border-l-none border-r-none border-b-2 dark:border-gray-700 border-gray-200 ${
              loading && "flex justify-center"
            }`}
          >
            {loading && "loading....."}
            {!loading ? (
              <Button
                variant="outlined"
                className="!w-fit !flex !item-start !justify-end !drop-shadow-2xl dark:!drop-shadow-[0_25px_25px_rgba(5,150,105,0.75)] !text-emerald-400  dark:!border-none"
                onClick={handleOuput}
                disabled={loading}
              >
                <VscRunAll size={25} />
              </Button>
            ) : (
              <ClipLoader
                color="#36d7b7"
                size={25}
                className="dark:bg-black !text-blue-900"
              />
            )}
          </div>
          <div className="row-span-11  h-full overflow-auto p-2 pb-3 text-pretty">
            {runOutput.output && <pre>{runOutput.output}</pre>}
            {runOutput.error && (
              <pre className="text-red-500">{runOutput.error}</pre>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default OutPut;
