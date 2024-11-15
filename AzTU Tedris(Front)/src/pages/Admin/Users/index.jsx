import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import AdminModal from "../../../components/Admin/AdminModal/Modal";
import DeleteConfirmationModal from "../../../components/Admin/AdminModal/DeleteConfirmationModal";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const isLgOrBigger = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (adminId) => {
    setSelectedAdminId(adminId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedAdminId(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/admins/${selectedAdminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refreshAdmins();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting admin:", error.message);
    }
  };

  const refreshAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const toggleRole = async (adminId, currentRole) => {
    try {
      const newRole = currentRole === "admin" ? "superadmin" : "admin";
      const token = localStorage.getItem("token");
      await API.put(
        `/admins/${adminId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshAdmins();
    } catch (error) {
      console.error("Error updating role:", error.message);
    }
  };

  const handleEditClick = (adminId) => {
    navigate(`/admin/edit-admin/${adminId}`);
  };

  useEffect(() => {
    refreshAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Admin Listi</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-sm font-medium text-white transition-all duration-300 ease-linear rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/admin/add-new-admin")}
        >
          {isLgOrBigger ? "Admin Əlavə Et" : <MdGroupAdd />}
        </button>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 rounded-t-lg">
              <th className="p-4 font-semibold">Ad</th>
              <th className="p-4 font-semibold">Soyad</th>
              <th className="p-4 font-semibold">Rol</th>
              <th className="p-4 font-semibold">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b text-center">
                <td className="p-2">{admin.name}</td>
                <td className="p-2">{admin.surname}</td>
                <td className="p-2">
                  <button
                    className={`px-2 py-1 text-sm cursor-default text-white rounded ${
                      admin.role === "admin"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {admin.role === "admin" ? "Admin" : "Super Admin"}
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditClick(admin.id)}
                    className="px-2 py-1 bg-green-500 text-sm text-white rounded hover:bg-green-600 mr-2"
                  >
                    {isLgOrBigger ? "Redaktə Et" : <FaEdit />}
                  </button>
                  <button
                    onClick={() => openDeleteModal(admin.id)}
                    className="px-2 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-600"
                  >
                    {isLgOrBigger ? "Sil" : <FaTrash />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal isOpen={isModalOpen} onClose={closeModal} refreshAdmins={refreshAdmins} />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminList;
