import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAutStore } from '../calendar/hooks/useAuthStore';
export const AppRouter = () => {
    const { status, checkAuthToken } = useAutStore();
    
    useEffect(() => {
        checkAuthToken();
    }, [])
    
    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }
  //  const authStatus = false;
    
  return (
      <Routes>
          {
              (status=== 'not-authenticated') 
                  ? (
                     <>
                      <Route path='auth/*' element={<LoginPage />}></Route>
                      <Route path='/*' element={<Navigate to="/auth/login"/>}></Route>
                     </>
                  )
                  : (
                      <>
                          <Route path='/' element={<CalendarPage/>}></Route>
                          <Route path='/*' element={<Navigate to="/"/>}></Route>
                      </>
                  )
          }
         
      </Routes>
  )
}
