import React, { useRef } from 'react';

const VerificationInput = () => {
  const inputsRef = useRef([]);


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      inputsRef.current[index].value = value;
      if (index < 3) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      inputsRef.current[index].value = '';
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 space-x-2">

      <div className='flex justify-center flex-col items-center p-6 md:p-10 rounded-2xl bg-white'>
      <p className='font-medium text-sm md:text-base'>Korporativ e-mail adresinizə göndərilmiş təsdiq kodunu daxil edin:</p>
      <div className='flex gap-5 mt-5'>
      {[0, 1, 2, 3].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className="w-14 md:w-16 lg:w-20 h-10 lg:h-12 border-2 p-2 rounded-md focus:shadow focus:shadow-blue-500  text-center text-xl focus:outline-none focus:ring-1 focus:border-none focus:ring-blue-500"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
      </div>
      </div>
    </div>
  );
};

export default VerificationInput;
