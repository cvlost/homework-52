import React from 'react';

type ChangeCheckbox = (index: number) => void;

interface CheckboxProps {
  isChecked: boolean;
  changeCheckbox: ChangeCheckbox;
  index: number;
}

const Checkbox: React.FC<CheckboxProps> = ({index, isChecked, changeCheckbox}) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => changeCheckbox(index)}
        />
        replace
      </label>
    </div>
  );
};

export default Checkbox;