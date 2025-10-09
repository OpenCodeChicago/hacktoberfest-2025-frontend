import { useState, useEffect, useRef, useCallback } from 'react';

export default function RangeSlider({ min, max, value, onChange }) {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);
  
  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const getPercentage = (val) => ((val - min) / (max - min)) * 100;
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    
    if (isDragging === 'min') {
      const newMin = Math.max(min, Math.min(newValue, maxValue - 1));
      setMinValue(newMin);
      onChange([newMin, maxValue]);
    } else if (isDragging === 'max') {
      const newMax = Math.min(max, Math.max(newValue, minValue + 1));
      setMaxValue(newMax);
      onChange([minValue, newMax]);
    }
  }, [isDragging, min, max, minValue, maxValue, onChange]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const percentage = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    
    if (isDragging === 'min') {
      const newMin = Math.max(min, Math.min(newValue, maxValue - 1));
      setMinValue(newMin);
      onChange([newMin, maxValue]);
    } else if (isDragging === 'max') {
      const newMax = Math.min(max, Math.max(newValue, minValue + 1));
      setMaxValue(newMax);
      onChange([minValue, newMax]);
    }
  }, [isDragging, min, max, minValue, maxValue, onChange]);

  const handleMouseDown = (type) => (e) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  const handleTouchStart = (type) => (e) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleTouchEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const handleMinInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    const newMin = Math.max(min, Math.min(Number(val) || min, maxValue - 1));
    setMinValue(newMin);
    onChange([newMin, maxValue]);
  };

  const handleMaxInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    const newMax = Math.min(max, Math.max(Number(val) || max, minValue + 1));
    setMaxValue(newMax);
    onChange([minValue, newMax]);
  };

  const minPos = getPercentage(minValue);
  const maxPos = getPercentage(maxValue);

  return (
    <div className="relative px-1">
      <div 
        ref={sliderRef}
        className="relative h-1 bg-gray-200 rounded-full mb-4 cursor-pointer"
        style={{ userSelect: 'none' }}
      >
        {/* Active range track */}
        <div 
          className="absolute h-1 bg-black rounded-full"
          style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
        />
        
        {/* Min value handle */}
        <div 
          className="absolute w-4 h-4 bg-black rounded-full shadow-lg -top-1.5 transform -translate-x-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${minPos}%`, zIndex: isDragging === 'min' ? 10 : 2 }}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleTouchStart('min')}
        />
        
        {/* Max value handle */}
        <div 
          className="absolute w-4 h-4 bg-black rounded-full shadow-lg -top-1.5 transform -translate-x-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${maxPos}%`, zIndex: isDragging === 'max' ? 10 : 2 }}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleTouchStart('max')}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
          <input 
            type="text" 
            value={Math.round(minValue)}
            onChange={handleMinInputChange}
            className="w-20 pl-6 pr-2 py-2 border border-gray-300 rounded-full text-right text-xs price-input"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <span className="text-gray-500 text-xs mx-2">to</span>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
          <input 
            type="text" 
            value={Math.round(maxValue)}
            onChange={handleMaxInputChange}
            className="w-20 pl-6 pr-2 py-2 border border-gray-300 rounded-full text-right text-xs price-input"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      </div>
    </div>
  );
}