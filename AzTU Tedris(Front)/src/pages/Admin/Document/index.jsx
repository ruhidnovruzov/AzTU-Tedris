import React from "react";
import { MdEdit } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { students } from "../../../data/studentsData";

const UserTable = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin/view/${id}`);
  };

  const editHandle = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Sənədlər</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border-b border-gray-200 px-6 py-6 text-left text-sm font-semibold">
                Adı
              </th>
              <th className="border-b border-gray-200 px-6 py-6 text-left text-sm font-semibold">
                Soyadı
              </th>
              <th className="border-b border-gray-200 px-6 py-6 text-left text-sm font-semibold">
                Sənəd Forması
              </th>
              <th className="border-b border-gray-200 px-6 py-6 text-left text-sm font-semibold">
                Sənəd Nümunəsi
              </th>
              <th className="border-b border-gray-200 px-6 py-6 text-center text-sm font-semibold">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border-b border-gray-200 px-6 py-3 text-sm">
                  {student.firstName}
                </td>
                <td className="border-b border-gray-200 px-6 py-3 text-sm">
                  {student.lastName}
                </td>
                <td className="border-b border-gray-200 px-6 py-3 text-sm">
                  {student.documentType}
                </td>
                <td className="border-b border-gray-200 px-6 py-3 text-sm">
                  {student.documentSample}
                </td>
                <td className="border-b flex justify-center gap-2 border-gray-200 px-6 py-3 text-sm">
                  <button
                    onClick={() => handleView(student.id)}
                    className="border flex items-center gap-1 border-gray-300 hover:bg-blue-600 hover:border-white hover:text-white transition-all duration-100 ease-in font-[600] py-1 px-2 rounded-2xl"
                  >
                    <MdRemoveRedEye />
                    <span className="hidden md:inline">View</span>
                  </button>
                  <button
                    onClick={() => editHandle(student.id)}
                    className="flex items-center gap-1 border border-gray-300 hover:bg-[orange] hover:border-white hover:text-white transition-all duration-100 ease-in font-[600] py-1 px-2 rounded-2xl"
                  >
                    <MdEdit />
                    <span className="hidden md:inline">Edit</span>
                  </button>
                  <button className="flex items-center gap-1 border hover:bg-[red] border-gray-300 hover:border-white hover:text-white transition-all duration-100 ease-in font-[600] py-1 px-2 rounded-2xl">
                    <IoMdTrash />
                    <span className="hidden md:inline">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserTable;
