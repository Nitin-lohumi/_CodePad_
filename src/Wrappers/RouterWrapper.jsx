import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Rooms from "../component/RoomComp/Rooms.jsx";
import FristScreen from "../component/FristScreen.jsx";
import App from "../App.jsx";
const Paths = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout />,
    children: [
      { path: "/", index: true, element: <App /> },
      { path: "/Join_Room/:roomID", element: <Rooms /> },
    ],
  },
]);
function RouterWrapper() {
  return (
    <>
      <RouterProvider router={Paths} />
    </>
  );
}

export default RouterWrapper;
