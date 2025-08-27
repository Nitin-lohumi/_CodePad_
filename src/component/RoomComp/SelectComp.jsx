import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useStore from "../../../Store";
import { toast } from "react-toastify";
import socketClient from "../../utility/Socket_Io";
function SelectComp({isCreated}) {
  const { Language, setLanguage } = useStore();
  const handleChange = (event) => {
    if (isCreated == "true") {
      setLanguage(event.target.value);
    } else {
      toast.info("You can not change select, tell to admin");
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
        <Select
          value={Language}
          onChange={handleChange}
          className="bg-white !font-bold dark:!bg-gray-800 dark:!text-white"
          MenuProps={{
            PaperProps: {
              className: "dark:!bg-gray-800 dark:!text-white !mt-1",
            },
          }}
        >
          <MenuItem
            value={"javascript"}
            className={`dark:!text-white hover:!bg-green-600 ${
              Language === "javascript"
                ? "dark:!bg-blue-500 bg-blue-400"
                : "dark:!bg-gray-800"
            }`}
          >
            javaScript
          </MenuItem>
          <MenuItem
            value={"java"}
            className={` dark:!text-white hover:!bg-green-600 ${
              Language === "java"
                ? "dark:!bg-blue-500  bg-blue-400"
                : "dark:!bg-gray-800"
            }`}
          >
            Java
          </MenuItem>
          <MenuItem
            value={"python"}
            className={` dark:!text-white hover:!bg-green-600 ${
              Language === "python"
                ? "dark:!bg-blue-500  bg-blue-400"
                : "dark:!bg-gray-800"
            }`}
          >
            python
          </MenuItem>
          <MenuItem
            value={"cpp"}
            className={`dark:!text-white hover:!bg-green-600 ${
              Language === "cpp"
                ? "dark:!bg-blue-500  bg-blue-400"
                : "dark:!bg-gray-800"
            }`}
          >
            C++
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default SelectComp;
