import React from 'react';
import { useFormContext } from 'react-hook-form';
import './index.css';
import { prefectures } from '../../../constants/form';
import { FormData } from '../../../models/common';

export const PrefectureSelect: React.FC<{ name: keyof FormData }> = ({ name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  const isError = !!errors[name];

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        都道府県
      </label>
      <div className="right-column form-select-wrapper">
        <select
          id={name}
          {...register(name)}
          defaultValue=""
          required
          className={`form-select form-control ${isError && 'error-input'}`}
        >
          <option value="">選択してください</option>
          {prefectures.map((prefecture) => (
            <option key={prefecture} value={prefecture}>
              {prefecture}
            </option>
          ))}
        </select>
        {isError && <p className="error-message">{errors[name]?.message}</p>}
      </div>
    </div>
  );
};
