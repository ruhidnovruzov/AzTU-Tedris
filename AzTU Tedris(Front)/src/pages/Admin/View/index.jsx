import React from "react";
import { useParams } from "react-router-dom";
import { students } from "../../../data/studentsData";
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ViewStudent = () => {
  const { id } = useParams();

  const student = students.find((student) => student.id === parseInt(id));

  if (!student) {
    return <div>Ele telebe tapilmadi</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center ml-4 gap-2">
        <Link to="/admin/documents"  className="shadow-md rounded-lg hover:shadow-lg transition-all duration-100 ease-in px-3 py-2">
          <FaChevronLeft className="text-gray-600"/>
        </Link>
        <h1 className="text-xl font-semibold ">Tələbə Məlumatı</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-lg mx-auto lg:mt-24 md:mt-20 sm:mt-20 mt-16   flex flex-col items-center p-10 w-[350px] lg:w-[400px]">
        <img
          src={student.image}
          alt=""
          className="h-24 w-24 rounded-full shadow-lg"
        />

        <div className="mt-5 text-center">
          <h2 className="text-3xl font-bold mb-2 ">
            {student.firstName} {student.lastName}
          </h2>

          <div className="text-left mt-4">
            <p className="text-sm text-gray-500">Sənəd Forması:</p>
            <p className="text-lg font-semibold">{student.documentType}</p>

            <p className="text-sm text-gray-500 mt-2">Sənəd Nümunəsi:</p>
            <p className="text-lg font-semibold">{student.documentSample}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
