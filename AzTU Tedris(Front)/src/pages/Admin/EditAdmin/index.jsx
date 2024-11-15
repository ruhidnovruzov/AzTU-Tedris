import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../services/api";

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    name: "",
    surname: "",
    email: "",
    role: ""
  });
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminData(response.data);
    } catch (error) {
      setError("Məlumatları alarkən xəta: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.put(`/admins/${id}`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/users"); 
    } catch (error) {
      setError("Yeniləməkdə xəta: " + error.message);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [id]);

  return (
<div className="md:w-[70%] container mx-auto p-4">
  <h1 className="text-xl mb-5 font-semibold">Admin Redaktə Et</h1>
  {error && <p className="text-red-500">{error}</p>}
  <form onSubmit={handleUpdate} className="space-y-4">
    
    <div className="md:flex md:space-x-4">
      <div className="flex-1 mb-4 md:mb-0">
        <label className="block text-gray-700">Ad</label>
        <input
          type="text"
          value={adminData.name}
          onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="flex-1 mb-4 md:mb-0">
        <label className="block text-gray-700">Soyad</label>
        <input
          type="text"
          value={adminData.surname}
          onChange={(e) => setAdminData({ ...adminData, surname: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700">Email</label>
      <input
        type="email"
        value={adminData.email}
        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
    </div>

    <div className="md:flex md:space-x-4">
      <div className="flex-1 mb-4 md:mb-0">
        <label className="block text-gray-700">Rol</label>
        <select
          value={adminData.role}
          onChange={(e) => setAdminData({ ...adminData, role: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-gray-700">Şifrə</label>
        <input
          type="password"
          placeholder="Yeni şifrə"
          value={adminData.password || ''}
          onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
    
    <button
      type="submit"
      className="px-4 py-2 w-full bg-blue-500 text-white rounded transition-all duration-300 ease-linear hover:bg-blue-600"
    >
      Yenilə
    </button>
  </form>
</div>

  );
};

export default EditAdmin;
