import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Branches from "./Pages/Branches";
import Plans from "./Pages/Plans";
import Members from "./Pages/member/Members";
import Settings from "./Pages/Settings";
import Sales from "./Pages/Sales";
import Staffs from "./Pages/Staffs";
import Enquiry from "./Pages/Enquiry";
import Transaction from "./Pages/Transaction";
import Profit_loss from "./Pages/Profit_loss";
import DietPlan from "./Pages/Dietplan";
import Login from "./Pages/Login";
import WorkoutPlan from "./Pages/WorkoutPlan";
import Layout from "./Layout/Layout";
import Products from "./Pages/Products";
import Equipments from "./Pages/Equipments";
import EsslMapping from "./Pages/EsslMapping";
import Attendance from "./Pages/Attendance";
import AuthExpiryWatcher from "./Components/AuthExpiryWatcher";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },


  {
    path: "/",
    element: (
      <>
        <AuthExpiryWatcher />
        <Layout />
      </>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "members", element: <Members /> },
      { path: "branches", element: <Branches /> },
      { path: "plans", element: <Plans /> },
      { path: "products", element: <Products /> },
      { path: "settings", element: <Settings /> },
      { path: "sales", element: <Sales /> },
      { path: "diet", element: <DietPlan /> },
      { path: "workplan", element: <WorkoutPlan /> },
      { path: "staffs", element: <Staffs /> },
      { path: "equipment", element: <Equipments /> },
      { path: "enquiry", element: <Enquiry /> },
      { path: "transaction", element: <Transaction /> },
      { path: "profit_loss", element: <Profit_loss /> },
      { path: "essl-mapping", element: <EsslMapping /> },
      { path: "attendance", element: <Attendance /> },
    ],
  }

]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;