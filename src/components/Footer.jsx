import Button from './Button';
import React, { useState } from 'react';

const Footer = () => {
  const [activeButton, setActiveButton] = useState(0);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const buttons = [
    { label: 'All', className: 'filter-btn' },
    { label: 'Active', className: 'filter-btn' },
    { label: 'Completed', className: 'filter-btn' },
  ];

  return (
    <footer>
      {buttons.map((button, index) => (
        <Button
          key={index}
          className={index === activeButton ? `${button.className} active` : button.className}
          label={button.label}
          onClick={() => handleClick(index)}
        />
      ))}
    </footer>
  );
};

export default Footer