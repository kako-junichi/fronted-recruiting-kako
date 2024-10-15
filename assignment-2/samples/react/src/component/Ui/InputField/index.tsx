import React from 'react';
import { useFormContext } from 'react-hook-form';
import './index.css';
import { FormData } from '../../../models/common';

export const InputField: React.FC<{
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  label: string;
}> = ({ name, type = 'text', placeholder, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  const isError = !!errors[name];

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="right-column">
        <input
          type={type}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className={`form-control ${isError && 'error-input'}`}
        />
        {isError && <p className="error-message">{errors[name]?.message}</p>}
      </div>
    </div>
  );
};
