import React from "react";

function FormElement({ name, field, type, placeholder }) {
  return (
    <div className="mt-3">
      <span>{field}</span>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        className="rounded border-2 border-gray-600 w-full p-2 mt-2 block"
      ></input>
    </div>
  );
}

export default FormElement;
