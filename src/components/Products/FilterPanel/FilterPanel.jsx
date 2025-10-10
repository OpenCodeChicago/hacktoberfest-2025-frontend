import { useMemo } from 'react';
import Accordion from './Accordion';
import RangeSlider from './RangeSlider';
import './FilterPanel.css';

export default function FilterPanel({
  open,
  onClose,
  products,
  filters = {},
  onChangeFilters,
}) {
  const { categories, goals, maxPrice } = useMemo(() => {
    const catMap = new Map();
    const goalMap = new Map();
    const prices = [];
    
    (products || []).forEach((p) => {
      if (p.category) {
        catMap.set(p.category, (catMap.get(p.category) || 0) + 1);
      }
      if (Array.isArray(p.goals)) {
        p.goals.forEach((g) => {
          goalMap.set(g, (goalMap.get(g) || 0) + 1);
        });
      }
      const price = Number(p.price || 0);
      if (!isNaN(price) && price > 0) {
        prices.push(price);
      }
    });

    const maxProductPrice = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 100;
    
    return {
      categories: Array.from(catMap.entries()),
      goals: Array.from(goalMap.entries()),
      maxPrice: maxProductPrice,
    };
  }, [products]);

  const priceRange = filters.priceRange || [0, maxPrice];
  const selectedCategories = new Set(filters.categories || []);
  const selectedGoals = new Set(filters.goals || []);
  const garageSaleOnly = !!filters.garageSaleOnly;

  // Ensure the price range is within bounds
  const effectivePriceRange = [
    Math.max(0, Math.min(priceRange[0], maxPrice)),
    Math.min(maxPrice, Math.max(priceRange[1], priceRange[0] + 1))
  ];

  const changeFilters = (patch) => {
    onChangeFilters({
      priceRange,
      categories: Array.from(selectedCategories),
      goals: Array.from(selectedGoals),
      garageSaleOnly,
      ...patch,
    });
  };

  const panelClass = `fixed top-0 left-0 h-full w-full sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
    open ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <div aria-hidden={!open}>
      <aside className={panelClass} role="dialog" aria-modal="true" style={{ zIndex: 10000 }}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mx-2 pb-3 border-b border-gray-200">
            <h3 className="text-xl font-bold">FILTERS</h3>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow custom-scrollbar px-1">
            <Accordion title="Price" defaultOpen={true}>
              <RangeSlider 
                min={0}
                max={maxPrice}
                value={effectivePriceRange}
                onChange={(newRange) => changeFilters({ priceRange: newRange })}
              />
            </Accordion>

            <Accordion title="Shop By Category" defaultOpen={true}>
              <div className="flex flex-col gap-1">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded"
                    style={{ accentColor: '#042650' }}
                    checked={garageSaleOnly}
                    onChange={() => changeFilters({ garageSaleOnly: !garageSaleOnly })}
                  />
                  <span className="text-sm">Garage Sale</span>
                </label>
                {categories.map(([name, count]) => (
                  <label key={name} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 rounded"
                      style={{ accentColor: '#042650' }}
                      checked={selectedCategories.has(name)}
                      onChange={() => {
                        const next = new Set(selectedCategories);
                        if (next.has(name)) next.delete(name);
                        else next.add(name);
                        changeFilters({ categories: Array.from(next) });
                      }}
                    />
                    <div className="flex gap-1 capitalize text-sm">
                      <span>{name}</span>
                      <span className="text-gray-700">({count})</span>
                    </div>
                  </label>
                ))}
              </div>
            </Accordion>

            <Accordion title="Shop By Goal" defaultOpen={true}>
              <div className="flex flex-col gap-1">
                {goals.map(([name, count]) => (
                  <label key={name} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 rounded"
                      style={{ accentColor: '#042650' }}
                      checked={selectedGoals.has(name)}
                      onChange={() => {
                        const next = new Set(selectedGoals);
                        if (next.has(name)) next.delete(name);
                        else next.add(name);
                        changeFilters({ goals: Array.from(next) });
                      }}
                    />
                    <div className="flex gap-1 capitalize text-sm">
                      <span>{name}</span>
                      <span className="text-gray-700">({count})</span>
                    </div>
                  </label>
                ))}
              </div>
            </Accordion>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                changeFilters({
                  priceRange: [0, maxPrice],
                  categories: [],
                  goals: [],
                  garageSaleOnly: false,
                });
              }}
              className="px-4 py-2 border rounded text-xs font-semibold hover:bg-gray-100 cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#023e8a] text-white rounded text-xs font-semibold hover:bg-[#1054ab] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}