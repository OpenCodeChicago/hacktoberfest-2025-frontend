import SuggestionCard from "./SuggestionsCard";

// Custom class definition to hide scrollbar in Webkit browsers (Chrome, Safari, Edge)
// NOTE: This style definition should ideally be in your global CSS file,
// but for a quick fix, we'll apply it directly using a template string.
const hideScrollbarClass = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function CartSuggestions({ suggestions, onClose }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-700 pb-2 border-b-2 border-gray-500">You may also like</h3>
      <div 
        className={`flex gap-3 overflow-x-auto pb-2 ${hideScrollbarClass}`} // 2. Applied custom class/styles (simplified in this view)
        role="list" 
        aria-label="Product suggestions" 
        tabIndex={0} 
        style={{
          scrollbarWidth: 'none', // 1. Hides scrollbar for Firefox
          WebkitOverflowScrolling: 'touch', // Optional: Improves scrolling on iOS
          // The Webkit scrollbar styles MUST be in a CSS class, not inline style, 
          // so we rely on the custom class definition or an external CSS file.
        }}
      >
        {suggestions.map((prod) => (
          <SuggestionCard
            key={prod.id || prod._id}
            prod={prod}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}