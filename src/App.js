import './App.css';
import { BrowserRouter, Switch, Route, Routes, Redirect } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import article from "./assets/jsons/article.json";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import AdminLayout from './components/AdminLayout';

import Home from './pages/Home';
import Board from './pages/Board';
import Article from './pages/Article';
import Game from './pages/Game';
import Team from './pages/Team';

import Login from './pages/AdminLogin';
import List from './pages/AdminList';
import Add from './pages/AdminAdd';
import Edit from './pages/AdminEdit';

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
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="board" element={<Board />} />
            <Route path="article/:articleTitle" element={<Article />} />
            <Route path="game" element={<Game />} />
            <Route path="team" element={<Team />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Login />} />
            <Route path="list" element={<List />} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:articleID" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App