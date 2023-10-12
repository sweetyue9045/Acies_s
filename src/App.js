import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import article from "./assets/jsons/article.json";

import Home from './pages/Home';
import Board from './pages/Board';
import Article from './pages/Article';
import Game from './pages/Game';
import Team from './pages/Team';

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
  }
])

const App = () => {
  const fetchMessages = () => {
    const APIs = JSON.stringify(article.reverse());
    window.localStorage.setItem("ArticleAPI", APIs);
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