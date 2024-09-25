import { createBrowserRouter } from "react-router-dom";
import Buffers from "./Components/Buffers/Buffers";
import DashboardBufferLayout from "./Components/DashboardBufferLayout";
import DashboardLayout from "./Components/DashboardLayout";
import GuestLayout from "./Components/GuestLayout";
import Support from "./Components/Support/Support";
import UserBufferDay from "./Components/User-buffer-day/UserBufferDay";
import UserBufferExpire from "./Components/User-buffer-end/UserBufferExpire";
import UserBufferUnActive from "./Components/User-buffer-unActive/UserBufferUnActive";
import UserBufferUser from "./Components/User-buffer-user/UserBufferUser";
import UserBuffer from "./Components/User-buffer/UserBuffer";
import UserAfiliate from "./Components/UserAfiliate/UserAfiliate";
import UserLayout from "./Components/UserLayout";
import UserLoges from "./Components/UserLoges/UserLoges";
import UserLogesBuffers from "./Components/UserLogesBuffers/UserLogesBuffers";
import UserView from "./Components/UserView";
import Admins from "./Components/admin/Admins";
// import Ads from "./Components/advertisement/ads";
import Affiliate from "./Components/affiliate-code/Affiliate";
import Archive from "./Components/archive/Archive";
import UserArchive from "./Components/archive/UserArchive";
import Bots from "./Components/bot/Bots";
import Captien from "./Components/captien/Captien";
import Earnings from "./Components/earnings/Earnings";
import GlobelPoll from "./Components/globel-Poll/GlobelPoll";
import Group from "./Components/groups/Group";
import Loges from "./Components/loges/Loges";
import Notifications from "./Components/notifications/Notifications";
import Plans from "./Components/plans/Plans";
import Posts from "./Components/posts/Posts";
import Recommendation from "./Components/recommendation/Recommendation";
import RecommendationTreansaction from "./Components/recommendation/RecommendationTreansaction";
import UserRecommendation from "./Components/recommendation/UserRecommendation";
import SuperAdmin from "./Components/superadmin/SuperAdmin";
import UserTable from "./Components/table/UserTable";
import Telegram from "./Components/telegram/Telegram";
import Tickers from "./Components/tickers/Tickers";
import UserActive from "./Components/user-active-bot/UserActive";
import User from "./Components/user/User";
import UsersProfit from "./Components/user/UsersProfit";
import UserGlobalBool from "./Components/user_globalpool/UserGlobalBool";
import UserDeleted from "./Components/usersDeleted/UsersDeleted";
import UsersPan from "./Components/usersPan/UsersPan";
import UserPending from "./Components/usersPending/UsersPending";
import UsersWithdraw from "./Components/usersWithdraw/UsersWithdraw";
import UsersBoot from "./Components/usersbot/UsersBoot";
import UserVideo from "./Components/video/UserVideo";
import Video from "./Components/video/Video";
import Dashboard from "./view/Dashboard";
import ForgotPassword from "./view/ForgotPassword";
import Login from "./view/Login";
import Otp from "./view/Otp";
import OtpReset from "./view/OtpReset";
import PasswordReset from "./view/PasswordReset";
import UserUpload from "./view/UserUpload";
// import LoginDashboard from "./view/LoginDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
  },
  {
    path: "/home",
    element: <UserLayout />,
  },
  {
    path: "/uploadtoplan",
    element: <UserUpload />,
  },
  {
    path: "/",
    element: <UserView />,
    children: [
      {
        path: "/",
        element: <UserArchive />,
      },
      {
        path: "recommendation",
        element: <UserRecommendation />,
      },
      {
        path: "video",
        element: <UserVideo />,
      },
      {
        path: "groups",
        element: <Group />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // {
      //   path: "/dashboard",
      //   element: <Navigate to="/" />,
      // },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/super_admin",
        element: <SuperAdmin />,
      },
      {
        path: "/dashboard/admins",
        element: <Admins />,
      },
      {
        path: "/dashboard/table",
        element: <UserTable />,
      },
      {
        path: "/dashboard/support",
        element: <Support />,
      },
      {
        path: "/dashboard/tickers",
        element: <Tickers />,
      },
      {
        path: "/dashboard/userbotactive",
        element: <UserActive />,
      },
      {
        path: "/dashboard/captien",
        element: <Captien />,
      },
      // {
      //   path: "/dashboard/advertisement",
      //   element: <Ads />,
      // },
      {
        path: "/dashboard/usersPending",
        element: <UserPending />,
      },
      {
        path: "/dashboard/usersPendingBot",
        element: <UsersBoot />,
      },
      {
        path: "/dashboard/panning",
        element: <UsersPan />,
      },
      {
        path: "/dashboard/deleted",
        element: <UserDeleted />,
      },
      {
        path: "/dashboard/userswithdraw",
        element: <UsersWithdraw />,
      },
      {
        path: "/dashboard/users",
        element: <User />,
      },
      {
        path: "/dashboard/groups",
        element: <Group />,
      },
      {
        path: "/dashboard/loges",
        element: <Loges />,
      },
      {
        path: "/dashboard/userloges",
        element: <UserLoges />,
      },
      {
        path: "/dashboard/userAfiliate",
        element: <UserAfiliate />,
      },
      {
        path: "/dashboard/usersprofit",
        element: <UsersProfit />,
      },
      {
        path: "/dashboard/Userglobalbool",
        element: <UserGlobalBool />,
      },
      {
        path: "/dashboard/bots",
        element: <Bots />,
      },
      {
        path: "/dashboard/affiliate",
        element: <Affiliate />,
      },
      {
        path: "/dashboard/recommendation",
        element: <Recommendation />,
      },
      {
        path: "/dashboard/recommendation/treansaction",
        element: <RecommendationTreansaction />,
      },
      {
        path: "/dashboard/archive",
        element: <Archive />,
      },
      {
        path: "/dashboard/plans",
        element: <Plans />,
      },
      {
        path: "/dashboard/globelpoll",
        element: <GlobelPoll />,
      },
      {
        path: "/dashboard/telegram",
        element: <Telegram />,
      },
      {
        path: "/dashboard/videos",
        element: <Video />,
      },
      {
        path: "/dashboard/posts",
        element: <Posts />,
      },
      {
        path: "/dashboard/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/buffer",
    element: <DashboardBufferLayout />,
    children: [
      {
        path: "/buffer/buffers",
        element: <Buffers />,
      },
      {
        path: "/buffer/UserBuffer",
        element: <UserBuffer />,
      },
      {
        path: "/buffer/UserBufferDay",
        element: <UserBufferDay />,
      },
      {
        path: "/buffer/UserBufferExpire",
        element: <UserBufferExpire />,
      },
      {
        path: "/buffer/UserBufferUser",
        element: <UserBufferUser />,
      },
      {
        path: "/buffer/UserBufferUnActive",
        element: <UserBufferUnActive />,
      },
      {
        path: "/buffer/Earnings",
        element: <Earnings />,
      },
      {
        path: "/buffer/userloges",
        element: <UserLogesBuffers />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "Otp",
        element: <Otp />,
      },
      {
        path: "Otp/reset",
        element: <OtpReset />,
      },
      {
        path: "passwordReset",
        element: <PasswordReset />,
      },
    //   {
    //     path: "/Home",
    // element: <UserLayout />,
    //   },
    ],
  },
  //   {
  //   path: "/recommendation",
  //   element: <Recomendetion />,
  // },
  // {
  //   path: "/example",
  //   element: <Example />,
  // },
]);
export default router;
