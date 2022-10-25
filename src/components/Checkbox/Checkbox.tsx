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
      <label className="replace-label">
        <input
          className="replace-input"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => changeCheckbox(index)}
        />
        <span>Replace</span>
      </label>
    </div>
  );
};

export default Checkbox;