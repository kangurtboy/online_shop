import React, { useContext, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { AppContext } from '../AppContext';
import './slider.css';

function PriceSlider({ maxPrice }) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxPrice);
  const {catalog} = useContext(AppContext);

  const handlePriceChange = (value) => {
    setMin(parseInt(value[0]));
    setMax(parseInt(value[1]));
  };

useEffect(()=>{
	catalog.minPrice = Number(min);
	catalog.maxPrice = Number(max);
} , [max , min])
  const handleChange = (e, name) => {
    const inputValue = e.target.value.replace(/\D/g, '');

    if (/^\d*$/.test(inputValue) && inputValue <= maxPrice) {
      if (name === 'min') {
        setMin(Number(e.target.value));
      } else {
        setMax(Number(e.target.value));
      }
    } else if (inputValue > maxPrice) {
      setMax(maxPrice);
    }
  };

  const handlePaste = (event) => {
    const pastedValue = event.clipboardData.getData('text');
    if (!/^\d*$/.test(pastedValue) || parseInt(pastedValue) > maxPrice) {
      event.preventDefault();
    }

  };

  const handleKeyDown = (event) => {
    if (
      event.keyCode === 69 ||
      (event.keyCode === 189 && event.target.length === 0) ||
      event.key === '.' ||
      event.key === ','
    ) {
      event.preventDefault();
    }
  };

  return (
    <>
      <h6>Стоимость</h6>
      <div className="prices">
        <div className="prices_container">
          <input
            className="prices_inp"
            type="number"
            value={min}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={(e) => handleChange(e, 'min')}
          />
        </div>
        <div className="prices_container">
          <input
            className="prices_inp"
            type="number"
            value={max}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={(e) => handleChange(e, 'max')}
          />
        </div>
      </div>
      <ReactSlider
        min={!isNaN(min) ? 0 : 0}
        max={!isNaN(max) ? maxPrice : 0}
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        value={[min, max]}
        onChange={handlePriceChange}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => (
          <div {...props}>{`${state.valueNow.toLocaleString('ru-RU')}\u00A0тг.`}</div>
        )}
      />
    </>
  );
}

export default PriceSlider;
