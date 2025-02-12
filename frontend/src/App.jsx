import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { Home, Menu, Contact, About, Services, BookTable,Cart } from "./Components";
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
