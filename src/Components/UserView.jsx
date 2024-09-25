/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Facebook } from 'react-content-loader';
import { Navigate, Outlet } from 'react-router-dom';
import "../assets/home.css";
import { UserStateContext } from '../contexts/ContextProvider';
import Sidebar from "./user-view/Sidebar";
import SidebarLeft from "./user-view/SidebarLeft";
export default function DashboardLayout() {
  const { userToken } = UserStateContext();
  const [loading, setLoading] = useState(true);




  // config laravel ==>config folder config 
  // in file config 
  // crose 
  
  if (!userToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
    <Navigate to="/Home" />;
      <div className="container">
        <div className="row">

          {loading ? (
            <Facebook/>
            ) : (
              <>
            <Sidebar />
            <div className="col-12 col-lg-8 col-xl-6 order-1 order-lg-2">
          <div className="card">
            <div className="card-body h-100 ">
            <Outlet />
            </div>
          </div>
          </div>
            <SidebarLeft />
            </>
          )}

        </div>
      </div>
    </>
  );
}
