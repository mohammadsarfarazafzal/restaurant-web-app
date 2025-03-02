import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { Home, Menu, Contact, About, Services, BookTable,Cart, SignUpForm, LoginForm, Account } from "./Components/index.js";
import { Provider } from "react-redux";
import {store} from "./StateManagement/Cart_Management/app/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "Contact",
          element: <Contact />,
        },
        {
          path: "Menu",
          element: (
            <Provider store={store}>
              <Menu />
            </Provider>   
          ),
        },
        {
          path: "About",
          element: <About />,
        },
        {
          path: "Services",
          element: <Services />,
        },
        {
          path: "BookTable",
          element: <BookTable />,
        },
        {
          path: "SignUp",
          element: <SignUpForm />,
        },
        {
          path: "Account",
          element: <Account />,
        },
        {
          path:"Login",
          element:<LoginForm/>
        },
        {
          path:"Cart",
          element:(
            <Provider store={store}>
              <Cart/>
            </Provider>
          )
        }
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
