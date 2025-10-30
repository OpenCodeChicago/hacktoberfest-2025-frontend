const MenuItem = ({
  collectionName,
  displayName,
  index,
  menuItemsRef,
  focusedIndex,
  handleCollectionClick,
}) => (
  <button
    ref={(el) => (menuItemsRef.current[index] = el)}
    onClick={() => handleCollectionClick(collectionName)}
    className="text-black text-left hover:text-gray-600 transition-all duration-300 ease-in-out relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-0 cursor-pointer link-underline"
    style={{
      fontSize: '22px',
      lineHeight: '26px',
      letterSpacing: '-1.5px',
      fontWeight: '400',
    }}
    role="menuitem"
    tabIndex={focusedIndex === index ? 0 : -1}
  >
    {displayName}
  </button>
);

const MenuColumn = ({
  title,
  items,
  menuItemsRef,
  focusedIndex,
  handleCollectionClick,
}) => {
  return (
    <div className="flex justify-between flex-col gap-4">
      <h3
        className="font-bold text-black uppercase"
        style={{
          fontSize: '22px',
          lineHeight: '24px',
          letterSpacing: '-1.5px',
        }}
      >
        {title}
      </h3>
      <ul className="space-y-2 h-full">
        {items.map((item) => (
          <li key={item.id}>
            <MenuItem
              collectionName={item.slug}
              displayName={item.displayName}
              index={item.index}
              menuItemsRef={menuItemsRef}
              focusedIndex={focusedIndex}
              handleCollectionClick={handleCollectionClick}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuColumn;
