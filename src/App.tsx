import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Tabbar } from "./components/Tabbar/Tabbar";
import HomePage from './pages/HomePage/HomePage';
import TipsPage from './pages/TipsPage/TipsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import GamesPage from './pages/GamesPage/GamesPage';
import TradingPage from './pages/TradingPage/TradingPage';
import { AuthProvider, AuthContext } from './AuthContext';
import SigninPage from './pages/SigninPage/SigninPage';
import ProtectedRoute from './ProtectedRoute';
import AuthLogger from './AuthLogger';

function App() {
    return (
        <AuthProvider>
            <AuthLogger />
            <Router>
            <main className="App">
                <Navbar />
                <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tips" element={<TipsPage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/trading" element={<TradingPage />} />
                </Route>
                <Route path="/signin" element={<SigninPage />} />
                </Routes>
                <Tabbar />
            </main>
            </Router>
      </AuthProvider>
    );
}

export default App;