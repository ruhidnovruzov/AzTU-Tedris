import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";

const About = lazy(() => import("./About"));
const Dashboard = lazy(() => import("./Dashboard")); 
const Setting = lazy(() => import("./Setting"));
const Document = lazy(() => import("./Document"));
const ViewStudent = lazy(() => import("./View"));
const Edit = lazy(() => import("./Edit"));
const Reference = lazy(() => import("./Reference"));
const Users = lazy(() => import("./Users"))
const EditAdmin = lazy(() => import("./EditAdmin"))
const AddNewAdmin = lazy(() => import("./NewAdmin"))

const AdminRoutes = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />  
          <Route path="/about" element={<About />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/documents" element={<Document />} />
          <Route path="/view/:id" element={<ViewStudent />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/users" element={<Users />}/>
          <Route path="/edit-admin/:id" element={<EditAdmin />} />
          <Route path="/add-new-admin" element={<AddNewAdmin />}/>
          </Routes>
      </Suspense>
    </DefaultLayout>
  );
};

export default AdminRoutes;
