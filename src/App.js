import React, {useContext} from 'react';
import './App.css';
import Register from "./pages/Login-Register/Register";
import Login from "./pages/Login-Register/Login";
import Home from "./pages/Home/Home";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";


const App = () => {
    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) => {
        if(!currentUser){
            return <Navigate to='/Chat-App/login' />
        }

        return children;
    }

    return (
        <BrowserRouter >
          <Routes>
              <Route path={'/Chat-App'} >
                  <Route index element={
                      <ProtectedRoute>
                          <Home />
                      </ProtectedRoute>
                  } />
                  <Route path='/Chat-App/login' element={<Login />} />
                  <Route path='/Chat-App/register' element={<Register />} />
              </Route>
          </Routes>
        </BrowserRouter>
    );
};

export default App;