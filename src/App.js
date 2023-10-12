import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import article from "./assets/jsons/article.json";

import Home from './pages/Home';
import Board from './pages/Board';
import Article from './pages/Article';
import Game from './pages/Game';
import Team from './pages/Team';
import Login from './pages/Login';
import List from './pages/AdminList';
import Add from "./pages/AddArticle";
import Edit from "./pages/EditArticle";
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/board',
    element: <Board />
  },
  {
    path: '/article/:articleTitle',
    element: <Article />
  },
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '/team',
    element: <Team />
  },
  {
    path: '/admin',
    element: <Login />
  },
  {
    path: '/admin/list',
    element: <List />
  },
  {
    path: '/admin/add',
    element: <AddArticle />
  },
  {
    path: '/admin/edit/:articleID',
    element: <EditArticle />
  }
])

const App = () => {
  const fetchMessages = () => {
    if (window.localStorage.getItem("ArticleAPI") == null) {
      const APIs = JSON.stringify(article.reverse());
      window.localStorage.setItem("ArticleAPI", APIs);
    }

    if (window.localStorage.getItem("UserInfo") == null) {
      const islogin = {
        email: "",
        username: "",
        id: ""
      }
      window.localStorage.setItem("UserInfo", JSON.stringify(islogin));
    }

  }
  useEffect(() => {
    fetchMessages()
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App