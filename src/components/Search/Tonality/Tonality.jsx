import React from 'react';
import { TONALITY_OPTIONS } from '../../../api/search';
import './Tonality.css';

const Tonality = ({ tonality, setTonality }) => {
  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="tonality">Тональность</label>
      <div className="select-wrapper"> 
        <select 
          id="tonality" 
          name="tonality" 
          value={tonality} 
          onChange={(e) => setTonality(e.target.value)}
        >
          {TONALITY_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Tonality;