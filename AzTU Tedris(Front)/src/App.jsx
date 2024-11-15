import React, { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "./context/TokenContext";
import ProtectedRoute from "./components/ProtectedRoute";

const AdminRoutes = lazy(() => import("./pages/Admin/index"));
const UserRoutes = lazy(() => import("./pages/User/index"));
const Login = lazy(() => import("./Authentication/Login"));

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/admin" replace /> : <Login />}
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={<UserRoutes />}/>
      </Routes>
    </Suspense>
  );
};

const WrappedApp = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default WrappedApp;
