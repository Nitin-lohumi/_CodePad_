import useStore from "../../../Store";
import Switch from "@mui/material/Switch";
function ToggleTheme() {
  const { toggle, setToggle } = useStore();
  return (
    <div>
      <label className="flex text-center items-center justify-end w-full">
        <p>{toggle ? "Dark" : "light"}</p>
        <Switch
          checked={toggle}
          onClick={setToggle}
          className="px-4 py-2 text-white rounded"
        />
      </label>
    </div>
  );
}

export default ToggleTheme;
