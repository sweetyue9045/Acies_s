import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";

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
    path: '/article/:typeId',
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App