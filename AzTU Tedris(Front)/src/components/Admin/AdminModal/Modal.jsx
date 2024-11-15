import React, { useState } from "react";
import API from "../../../services/api";

const AdminModal = ({ isOpen, onClose, refreshAdmins }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !password) {
      setError("Fields cannot be empty.");
      return;
    }

    try {
      await API.post("/admin/create-admin", { name, surname, email, password });
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setError("");

      onClose();
      refreshAdmins();
    } catch (error) {
      setError("Error creating admin. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 ease-out scale-100">
        <h2 className="text-xl font-semibold mb-6 text-center">Yeni Admin Əlavə Et</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ad"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Soyad"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrə"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Yarat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
