import * as Slider from '@radix-ui/react-slider';
import { useState, useEffect } from 'react';

export default function LeverageSlider() {
  const [value, setValue] = useState([0]);
  const [inputValue, setInputValue] = useState('0');

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue);
    setInputValue(newValue[0].toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    let newValue = parseInt(inputValue, 10);
    if (isNaN(newValue) || newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }
    setValue([newValue]);
    setInputValue(newValue.toString());
  };

  useEffect(() => {
    setInputValue(value[0].toString());
  }, [value]);

  return (
    <div className="flex items-center gap-2 w-full  p-2  rounded-md max-w-full">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        onValueChange={handleSliderChange}
        max={100}
        step={1}
      >
        <Slider.Track className="bg-[#282b39] relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-white rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-3 h-3 bg-white rounded-full focus:outline-none"
          aria-label="Slider value"
        />
        {/* <Slider.Mark
          value={30}
          className="absolute top-5 w-0.5 h-1.5 bg-zinc-700"
        />
        <Slider.Mark
          value={90}
          className="absolute top-5 w-0.5 h-1.5 bg-zinc-700"
        />
        <Slider.Mark
          value={100}
          className="absolute top-5 w-0.5 h-1.5 bg-zinc-700"
        /> */}
      </Slider.Root>

      <div className="relative bg-[#282b39]  ">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-[80px] px-1.5 py-0.5 bg-[#282b39]  text-center text-white rounded text-f15 appearance-none focus:outline-none focus:ring-1 focus:ring-white"
          style={{ paddingRight: '16px' }}
        />
        <span className="absolute right-1.5 top-1/2 transform -translate-y-1/2 text-white text-f15">
          %
        </span>
      </div>
    </div>
  );
}
