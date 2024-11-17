'use client';
import React from 'react';

type ToggleSwitchProps = {
  label: string;
  onChange: (value: any) => void;
};

// Filename: ./components/ToggleSwitch.js

const ToggleSwitch = ({ label, onChange }: ToggleSwitchProps) => {
  return (
    <div className='container flex flex-row items-center gap-2'>
      {label}{' '}
      <div className='toggle-switch'>
        <input
          type='checkbox'
          className='checkbox'
          name={label}
          id={label}
          onChange={() => onChange}
        />
        <label className='label' htmlFor={label}>
          <span className='inner' />
          <span className='switch' />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
