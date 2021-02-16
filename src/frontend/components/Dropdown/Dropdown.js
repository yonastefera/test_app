import React, { useState } from 'react';

import DarkArrowDownIcon from '../../../../public/assets/icons/dark_arrow_down.svg';

import './Dropdown.scss';

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.values[0]);

  return (
    <div className={`dropdowns-wrapper`}>
      <div
        className={`dropdown-switcher`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className={`dropdown-switcher__label`}>{selectedValue}</div>

        <div className={`dropdown-switcher__icon`}>
          <img
            src={DarkArrowDownIcon}
            alt="Arrow down"
            className={`${isOpen ? 'dropdown-switcher__icon--transform' : ''}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className={`items-wrapper`}>
          {props.values.map((value) => {
            return (
              <div
                className={`dropdown-item`}
                onClick={() => {
                  setIsOpen(!isOpen);
                  setSelectedValue(value);
                  props.onChange(value);
                }}
                key={value}
              >
                {value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
