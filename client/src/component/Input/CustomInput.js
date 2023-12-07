import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "../Input/style.scss";

const CustomInput = forwardRef(
  ({ type, id, name, label, errorMessage, placeholder, autoComplete }, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
      getValue: () => {
        return inputRef.current.value;
      },
      setValue: (value) => {
        inputRef.current.value = value;
      },
      getFile: (value) => {
        console.log(value);
        inputRef.current.files[0] = value;
      },
    }));
    return (
      <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <input
          placeholder={placeholder}
          ref={inputRef}
          type={type}
          id={id}
          name={name}
          autoComplete={autoComplete}
          min={1}
          required
        />
        <span>{errorMessage}</span>
      </div>
    );
  }
);

export default CustomInput;
