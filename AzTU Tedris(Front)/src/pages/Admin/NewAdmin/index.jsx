import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";

const AddNewAdmin = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !password) {
      setError("Sahələr boş ola bilməz.");
      return;
    }

    if (!email.endsWith("@aztu.edu.az")) {
      setError("Korporativ email ünvanı ilə hesab yaradın.");
      return;
    }

    try {
      await API.post("/admin/create-admin", { name, surname, email, password });
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setError("");

      navigate("/admin/users");
    } catch (error) {
      setError("Error creating admin. Please try again.");
    }
  };

  return (
<div className="flex w-full mt-28 flex-col items-center">
  <h2 className="md:text-2xl text-[20px] font-semibold mb-4">Yeni Admin Əlavə Et</h2>
  <form onSubmit={handleSubmit} className="flex flex-col w-[90%] md:w-[50%] space-y-4">
    {error && <p className="text-red-500">{error}</p>}

    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
      <input
        type="text"
        placeholder="Ad"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded focus:outline-gray-400 w-full"
      />
      <input
        type="text"
        placeholder="Soyad"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className="border p-2 rounded focus:outline-gray-400 w-full"
      />
    </div>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border p-2 rounded focus:outline-gray-400"
    />
    <input
      type="password"
      placeholder="Şifrə"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border p-2 rounded focus:outline-gray-400"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded transition-all duration-300 ease-linear hover:bg-blue-600"
    >
      Admin Əlavə Et
    </button>
  </form>
</div>

  );
};

export default AddNewAdmin;
