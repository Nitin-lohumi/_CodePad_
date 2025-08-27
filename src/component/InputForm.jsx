import TextField from "@mui/material/TextField";
function InputForm({ setUserName, userName, roomId, setRoomId }) {
  return (
    <>
      <div className="md:p-4 flex flex-col w-full md:gap-4 gap-3 items-center md:underline outline-none">
        <label htmlFor="" className="w-full">
          <TextField
            type="text"
            value={userName}
            onChange={(e) => {
              return setUserName(e.target.value);
            }}
            label="Enter your name"
            placeholder="Enter your name"
            variant="outlined"
            className="w-full outline-none hover:outline-none"
            autoComplete="off"
            InputLabelProps={{
              style: { color: "gray" },
            }}
            slotProps={{
              input: {
                className:
                  "dark:!text-white text-black  !font-bold placeholder-gray-500",
              },
            }}
          />
        </label>
        <label htmlFor="" className="w-full">
          <TextField
            type="text"
            value={roomId}
            className="w-full outline-none text-blue-800"
            onChange={(e) => setRoomId(e.target.value)}
            label="Enter your RoomId"
            placeholder="Enter your Room Id"
            variant="outlined"
            autoComplete="off"
            InputLabelProps={{
              style: { color: "gray" },
            }}
            slotProps={{
              input: {
                className:
                  "dark:!text-white text-black font-bold placeholder-gray-400",
              },
            }}
          />
        </label>
      </div>
    </>
  );
}

export default InputForm;
