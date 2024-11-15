import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Apply = lazy(() => import("./Apply"));
const Verify = lazy(() => import("./Verification"))

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/muraciet-et" element={<Apply />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
