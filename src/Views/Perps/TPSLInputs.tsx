'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@Utils/cn';

export default function TPSLInput({ className }: { className?: string }) {
  const [values, setValues] = useState({
    tpPrice: '',
    tpPercentage: '',
    slPrice: '',
    slPercentage: '',
  });

  const handlePriceChange = (type: 'tp' | 'sl', value: string) => {
    const basePrice = 100; // This would be your base/entry price
    const numValue = parseFloat(value) || 0;

    if (type === 'tp') {
      const percentage = ((numValue - basePrice) / basePrice) * 100;
      setValues({
        ...values,
        tpPrice: value,
        tpPercentage: percentage.toFixed(2),
      });
    } else {
      const percentage = ((numValue - basePrice) / basePrice) * 100;
      setValues({
        ...values,
        slPrice: value,
        slPercentage: percentage.toFixed(2),
      });
    }
  };

  const handlePercentageChange = (type: 'tp' | 'sl', value: string) => {
    const basePrice = 100; // This would be your base/entry price
    const percentage = parseFloat(value) || 0;

    if (type === 'tp') {
      const price = basePrice + basePrice * (percentage / 100);
      setValues({
        ...values,
        tpPrice: price.toFixed(2),
        tpPercentage: value,
      });
    } else {
      const price = basePrice + basePrice * (percentage / 100);
      setValues({
        ...values,
        slPrice: price.toFixed(2),
        slPercentage: value,
      });
    }
  };

  return (
    <div className={cn('w-full  space-y-2 ', className)}>
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="TP Price"
            value={values.tpPrice}
            onChange={(e) => handlePriceChange('tp', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Gain"
            value={values.tpPercentage}
            onChange={(e) => handlePercentageChange('tp', e.target.value)}
            className="w-full px-3 py-2 pr-8 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300">
            <ChevronDown className="w-4 h-4" />
            <span className="sr-only">Toggle percentage options</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="SL Price"
            value={values.slPrice}
            onChange={(e) => handlePriceChange('sl', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Loss"
            value={values.slPercentage}
            onChange={(e) => handlePercentageChange('sl', e.target.value)}
            className="w-full px-3 py-2 pr-8 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300">
            <ChevronDown className="w-4 h-4" />
            <span className="sr-only">Toggle percentage options</span>
          </button>
        </div>
      </div>
    </div>
  );
}
