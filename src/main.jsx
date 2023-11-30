import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Components/Root/Root.jsx";
import Home from "./Pages/Home/Home.jsx";
import Employee from "./Pages/Employee/Employee.jsx";
import Hr from "./Pages/Hr/Hr.jsx";
import Login from "./Pages/Login/Login.jsx";
import MyEmployee from "./Pages/HrPage/MyEmployee/MyEmployee.jsx";
import AddEmployee from "./Pages/HrPage/AddEmployee/AddEmployee.jsx";
import AssetList from "./Pages/HrPage/AssetList/AssetList.jsx";
import AddAsset from "./Pages/HrPage/AddAsset/AddAsset.jsx";
import Request from "./Pages/HrPage/Request/Request.jsx";
import CustomRequest from "./Pages/HrPage/CustomRequest/CustomRequest.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import UpdateAsset from "./Pages/HrPage/Update/UpdateAsset.jsx";
import Payment from "./Pages/HrPage/Payment/Payment.jsx";
import Assets from "./Pages/EmployeePage/Assets/Assets.jsx";
import EmployeeCustom from "./Pages/EmployeePage/EmployeeCustom/EmployeeCustom.jsx";
import Team from "./Pages/EmployeePage/Team/Team.jsx";
import EmployeeProfile from "./Pages/EmployeePage/EmployeeProfile/EmployeeProfile.jsx";
import HrProfile from "./Pages/HrPage/HrProfile/HrProfile.jsx";
import EmployeeHome from "./Pages/EmployeePage/EmployeeHome/EmployeeHome.jsx";
import HrHome from "./Pages/HrPage/HrHome/HrHome.jsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/joinEmploye",
        element: <Employee />,
      },
      {
        path: '/payment',
        element: <Payment/>
      },
      {
        path: "/joinHr",
        element: <Hr />,
      },
      {
        path: "/employees",
        element: <MyEmployee />,
      },
      {
        path: "/employeHome",
        element: <EmployeeHome />,
      },
      {
        path: "/addEmployee",
        element: <AddEmployee />,
      },
      {
        path: "/assetList",
        element: <AssetList />,
      },
      {
        path: "/addAsset",
        element: <AddAsset />,
      },
      {
        path: "/requests",
        element: <Request />,
      },
      {
        path: '/hrProfile',
        element: <HrProfile/>
      },
      {
        path: "/hrCustomRequest",
        element: <CustomRequest />,
      },
      {
        path: "/hrHome",
        element: <HrHome />,
      },
      {
        path:'/updateAsset/:id',
        element: <UpdateAsset/>,
        loader: ({params})=> fetch(`http://localhost:5000/addAsset/${params.id}`)
      },

      //employee
      {
        path: '/assetRequest',
        element: <Assets/>
      },
      {
        path : '/customRequest',
        element: <EmployeeCustom/>
      },
      {
        path: '/team',
        element: <Team/>
      },
      {
        path: '/profile',
        element: <EmployeeProfile/>
      }
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
