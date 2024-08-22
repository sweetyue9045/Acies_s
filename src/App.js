import { useEffect,useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import article from "./assets/jsons/article.json";
import AdminLayout from './components/AdminLayout';
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Article from './pages/Article';
import Board from './pages/Board';
import Game from './pages/Game';
import Home from './pages/Home';
import Team from './pages/Team';

import Add from './pages/AdminAdd';
import Edit from './pages/AdminEdit';
import List from './pages/AdminList';
import Login from './pages/AdminLogin';

import Loading from "./components/Loading"; // 引入 Loading 组件

const App = () => {
  const [loading, setLoading] = useState(true); // 添加 loading 状态

  const fetchMessages = async () => {
    
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
    const initialize = async () => {
      await fetchMessages();
      // 這裡可以加入其他的初始化邏輯，例如請求 API 等
      setLoading(false); 
    }

    initialize();
  }, []);

  if (loading) {
    return <Loading />;
  }
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