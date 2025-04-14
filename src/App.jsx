import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyBooksPage from "./pages/MyBooksPage/MyBooksPage";
import Header from "./common/components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-books" element={<MyBooksPage />} />
      </Routes>
    </div>
  );
}

export default App;
