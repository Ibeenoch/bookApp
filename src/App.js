import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import BookSearch from './component/BookSearch';
import MyBookShelf from './component/MyBookShelf';
import Book from './component/Book';
import LastBookOpen from './component/LastBookOpen';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BookSearch />,
    },
    {
      path: "/book/works",
      element: <MyBookShelf />,
    },
    {
      path: "/book/works/:id",
      element: <Book />,
    },
    {
      path: "/last/read",
      element: <LastBookOpen />,
    },
   
  ]);
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;
