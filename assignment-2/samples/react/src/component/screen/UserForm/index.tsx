import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './index.css';
import { PrefectureSelect } from '../../Ui/PrefectureSelect';
import { FormData } from '../../../models/common';
import { formDataSchema } from '../../../constants/form';
import { InputField } from '../../Ui/InputField';

export const UserForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('https://httpstat.us/201', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('保存しました。');
      } else {
        alert('保存に失敗しました。');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('エラーが発生しました。');
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <InputField name="name" label="氏名" placeholder="(例)トレタ 太郎" />
        <InputField name="email" type="email" label="Eメール" placeholder="(例)yoyaku@toreta.in" />
        <InputField name="zip" label="郵便番号" placeholder="(例)0000000" />
        <PrefectureSelect name="prefecture" />
        <InputField
          name="address1"
          label="市区町村・番地"
          placeholder="(例)品川区西五反田７丁目２２−１７"
        />
        <InputField name="address2" label="建物名・号室" placeholder="(例)TOCビル 8F" />

        <div className="button-wrapper">
          <button type="submit" disabled={isSubmitting || !isValid} className="submit-button">
            保存
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserForm;
