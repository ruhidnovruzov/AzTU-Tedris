import React, { useState } from "react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    groupNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const standardText = `Hörmətli rəhbərlik, mən ${formData.name} ${formData.surname}, ${formData.groupNumber} qrup tələbəsi, arayış tələb edirəm.`;

    console.log("Göndərilən məlumat:", standardText);
  };

  return (
    <div className="application-form">
      <h2>Arayış üçün müraciət</h2>
      <form>
        <label htmlFor="name">Ad:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="surname">Soyad:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />

        <label htmlFor="groupNumber">Qrup Nömrəsi:</label>
        <input
          type="text"
          id="groupNumber"
          name="groupNumber"
          value={formData.groupNumber}
          onChange={handleChange}
          required
        />

        <div className="standard-text">
          Hörmətli rəhbərlik, mən{" "}
          <span>{formData.name || "_____"}</span>{" "}
          <span>{formData.surname || "_____"}</span>,{" "}
          <span>{formData.groupNumber || "_____"}</span> qrup tələbəsi, arayış
          tələb edirəm.
        </div>

        <button type="submit">Göndər</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
