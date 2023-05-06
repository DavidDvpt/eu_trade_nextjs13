import { nanoid } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';
import './formFields.scss';
interface IRadioButtonsProps {
  name: string;
  values: { label: string; value: string }[];
  defaultValue: string;
  control: any;
}
function HookFormRadioButtons({
  name,
  values,
  control,
  defaultValue,
}: IRadioButtonsProps) {
  return (
    <div className='radio-button-container'>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            {values.map((v) => (
              <div key={nanoid()}>
                <input
                  type='radio'
                  {...field}
                  value={v.value}
                  checked={field.value === v.value}
                />
                <label htmlFor={name}>{v.label}</label>
              </div>
            ))}
          </>
        )}
      />
    </div>
  );
}

export default HookFormRadioButtons;
