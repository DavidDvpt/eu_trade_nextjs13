import { nanoid } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';

interface IRadioButtonsProps {
  name: string;
  values: { label: string; value: string }[];
  control: any;
}
function HookFormRadioButtons({ name, values, control }: IRadioButtonsProps) {
  return (
    <div>
      {values.map((v) => (
        <Controller
          key={nanoid()}
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <>
              <input type='radio' />
              <label htmlFor={name}>{v.label}</label>
            </>
          )}
        />
      ))}
    </div>
  );
}

export default HookFormRadioButtons;
