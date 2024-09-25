import {  Outlet } from "react-router-dom";
// import { UserStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  // const { userToken } = UserStateContext();


  return (
    <>
        {/* <Navigate to="/Home" /> */}
        <Outlet />
    </>
  );
}
