import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import VerifyEmail from "./components/VerifyEmail";
import RootFile from "./Rootfile";
import { checkAuthLoader } from "./utils/checkAuthLoader";
import Table from "./pages/Table";
import BankPage from "./pages/BankPage";
import Address from "./pages/Address";
import { checkVerifyLoader } from "./utils/checkVerify";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <RootFile />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: checkAuthLoader,
      },
      {
        path: "table",
        element: <Table />,
        loader: checkAuthLoader,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
        // loader: checkAuthLoader,
      },
      {
        path: "bank",
        element: <BankPage />,
        loader: checkVerifyLoader,
      },
      {
        path: "address",
        element: <Address />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
