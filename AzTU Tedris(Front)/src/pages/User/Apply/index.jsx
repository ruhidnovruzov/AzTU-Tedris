import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../api/config";
import axios from "axios";

const Apply = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    finCode: "",
    email: "",
    select1: "",
    select2: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    finCode: "",
    email: "",
    select: "",
    select2: "",
  });

  const [applymentTypes, setApplymentTypes] = useState([]);
  const [applymentForms, setApplymentForms] = useState([]);

  //fetched data for select
  useEffect(() => {
    const fetchApplymentTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/applyment-types`);
        const types = response.data;
        setApplymentTypes(types);
      } catch (error) {
        console.error("Applyment types yüklenemedi:", error);
      }
    };

    const fetchApplymentForms = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/applyment-forms`);
        const forms = response.data;
        setApplymentForms(forms);
      } catch (error) {
        console.error("Applyment forms yüklenemedi:", error);
      }
    };

    fetchApplymentTypes();
    fetchApplymentForms();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleFinCodeChange = (e) => {
    const finValue = e.target.value.toUpperCase();
    setFormData({
      ...formData,
      finCode: finValue,
    });

    validateField("finCode", finValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "firstName" || name === "lastName") {
      newValue = capitalizeFirstLetter(value);
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });

    validateField(name, newValue);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName" && value.length === 0) {
      error = "Ad boş ola bilməz";
    }

    if (name === "lastName" && value.length === 0) {
      error = "Soyad boş ola bilməz";
    }

    if (name === "finCode") {
      if (value.length !== 7) {
        error = "FIN kodu 7 simvol olmalıdır";
      }
    }

    if (name === "email" && !value.endsWith("@student.aztu.edu.az")) {
      error = "Korporativ email ilə daxil olun";
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const isFormValid =
    Object.values(errors).every((error) => error === "") &&
    Object.values(formData).every((field) => field !== "");

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[45%] mx-auto mt-5 p-4 md:p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-[#0e205b] text-center mb-4 md:mb-8">
          AzTU Tədris
        </h1>
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="peer w-full bg-transparent placeholder:text-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Ad"
              />
              <label
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left ${
                  formData.firstName || formData.firstName !== ""
                    ? "-top-2.5 scale-90 text-xs text-slate-400"
                    : "top-2.5 text-sm text-slate-400"
                } peer-focus:-top-2.5 peer-focus:scale-90 peer-focus:text-xs peer-focus:text-slate-400`}
              >
                Ad
              </label>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-2">{errors.firstName}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="peer w-full bg-transparent placeholder:text-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Soyad"
              />
              <label
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left ${
                  formData.lastName || formData.lastName !== ""
                    ? "-top-2.5 scale-90 text-xs text-slate-400"
                    : "top-2.5 text-sm text-slate-400"
                } peer-focus:-top-2.5 peer-focus:scale-90 peer-focus:text-xs peer-focus:text-slate-400`}
              >
                Soyad
              </label>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-2">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="relative sm:col-span-1">
              <input
                type="text"
                name="finCode"
                value={formData.finCode}
                onChange={handleFinCodeChange}
                className="peer  w-full bg-transparent placeholder:text-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="FIN"
                maxLength={7}
              />
              <label
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left ${
                  formData.finCode || formData.finCode !== ""
                    ? "-top-2.5 scale-90 text-xs text-slate-400"
                    : "top-2.5 text-sm text-slate-400"
                } peer-focus:-top-2.5 peer-focus:scale-90 peer-focus:text-xs peer-focus:text-slate-400`}
              >
                FIN
              </label>
              {errors.finCode && (
                <p className="text-red-500 text-xs mt-2">{errors.finCode}</p>
              )}
            </div>
            <div className="relative sm:col-span-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="peer w-full bg-white placeholder:text-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Email"
              />
              <label
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left ${
                  formData.email || formData.email !== ""
                    ? "-top-2.5 scale-90 text-xs text-slate-400"
                    : "top-2.5 text-sm text-slate-400"
                } peer-focus:-top-2.5 peer-focus:scale-90 peer-focus:text-xs peer-focus:text-slate-400`}
              >
                Email
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <select
              name="select1"
              value={formData.select1}
              onChange={handleChange}
              className="peer w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            >
              <option value="">Sənəd növü</option>
              {applymentTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              name="select2"
              value={formData.select2}
              onChange={handleChange}
              className="peer w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            >
              <option value="">Sənəd forması</option>
              {applymentForms.map((form) => (
                <option key={form.id} value={form.name}>
                  {form.description}
                </option>
              ))}
            </select>
          </div>
          {isFormValid && (
            <button
              type="submit"
              onClick={() => navigate("/verify")}
              className="w-full px-4 py-2 bg-[#0e205b] text-white rounded-lg"
            >
              Müraciət et
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Apply;
