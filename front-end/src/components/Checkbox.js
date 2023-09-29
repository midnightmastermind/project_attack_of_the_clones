/** Checkbox component that takes in properties for label, checked, labelStyle, onClick, disableCheckbox, and index.
 * Renders checkbox alongside label text specified in file.*/

import React, { useState, useEffect } from "react";
import '../css/Checkbox.css';

const Checkbox = ({ label, checked, labelStyle, onClick, disableCheckbox, index, ...props }) => {
  const [isChecked, setIsChecked] = useState(checked); // Initialize with the prop value

  useEffect(() => {
      setIsChecked(checked); // Update internal state when prop changes
  }, [checked]);
  const handleInputChange = () => {
      if (disableCheckbox) {
          if (isChecked) {
              setIsChecked(false);
              if (onClick) {
                  onClick(label, false);
              }
          }
      } else {
          const updatedChecked = !checked; // Use the checked prop directly
          setIsChecked(updatedChecked);
          if (onClick) {
              onClick(label, updatedChecked);
          }
      }
  };

  return (
      <div className="checkbox pb-5">
          <label>
              <input
                  type="checkbox"
                  onChange={handleInputChange}
                  checked={checked} // Use the checked prop directly
                  {...props}
                  className={checked ? "checked" : ""}
              />
              <span style={labelStyle}>{label}</span>
          </label>
      </div>
  );
};

export default Checkbox;