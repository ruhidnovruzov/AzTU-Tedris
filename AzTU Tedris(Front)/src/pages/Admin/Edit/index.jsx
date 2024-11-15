import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { students } from "../../../data/studentsData";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const student = students.find((student) => student.id === parseInt(id));
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [documentType, setDocumentType] = useState(student.documentType);
  const [documentSample, setDocumentSample] = useState(student.documentSample);

  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Tələbə Redaktəsi</h1>
      <form className="flex flex-col space-y-4">
        <div>
          <label className="block mb-1">Adı:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border px-3 rounded py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Soyadı:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border px-3 rounded py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Sənəd Forması:</label>
          <input
            type="text"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="border px-3 rounded py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Sənəd Nümunəsi:</label>
          <input
            type="text"
            value={documentSample}
            onChange={(e) => setDocumentSample(e.target.value)}
            className="border px-3 rounded py-2 w-full"
          />
        </div>
        <div className="w-full flex gap-4">
          <button
            type="submit"
            className="mt-4 px-4 py-2 w-1/2 bg-[red] text-nowrap transition-all duration-200 hover:bg-[#dd0000] text-white rounded"
            onClick={() => navigate("/admin/documents")}
          >
            Imtina et
          </button>
          <button
            type="submit"
            className="mt-4 px-4 py-2 w-1/2 text-nowrap bg-[#0fe60f] transition-all duration-200 hover:bg-[#31bd31] text-white rounded"
          >
            Yadda saxla
          </button>
        </div>
      </form>
    </section>
  );
};

export default Edit;
