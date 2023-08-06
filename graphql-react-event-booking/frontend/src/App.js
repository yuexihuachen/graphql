import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { createContext, useState } from 'react';
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavition from "./components/Navigation/MainNavigation";
import AuthContext from "./context/auth-context";
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    token: null,
    userId: null
  });

  const login = (token, userId,tokenExpiration) => {
    setUserInfo({
      token,
      userId
    })
  }

  const logout = () => {
    setUserInfo({
      token: null,
      userId: null
    })
  }

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider value={{
          token: userInfo.token,
          userId: userInfo.userId,
          login,
          logout
        }}>
        <MainNavition />
        <main className="main-content">
          <Routes>
            {
              !userInfo.token && <Route path="/" element={<Navigate to={"/auth"} />} />
            }
            {
              !userInfo.token && <Route path="/bookings" element={<Navigate to={"/auth"} />} />
            }
            {
              userInfo.token && <Route path="/" element={<Navigate to={"/events"} />} />
            }
            {
              userInfo.token && <Route path="/auth" element={<Navigate to={"/events"} />} />
            }

            {
              !userInfo.token && <Route path="/auth" Component={AuthPage} />
            }
            <Route path="/events" Component={EventsPage} />
            {
              userInfo.token && <Route path="/bookings" Component={BookingsPage} />
            }
            
          </Routes>
        </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
