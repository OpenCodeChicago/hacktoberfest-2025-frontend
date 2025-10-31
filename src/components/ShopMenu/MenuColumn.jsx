import { NavLink } from 'react-router-dom';

const MenuItem = ({
  collectionName,
  displayName,
  index,
  menuItemsRef,
  focusedIndex,
  handleCollectionClick,
}) => (
  <NavLink
    ref={(el) => (menuItemsRef.current[index] = el)}
    to={`/collections/${collectionName}`}
    onClick={handleCollectionClick}
    className="text-black text-left hover:text-gray-600 transition-all duration-300 ease-in-out relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-0 cursor-pointer link-underline block"
    style={{
      fontSize: '20px',
      lineHeight: '20px',
      letterSpacing: '-1.5px',
      fontWeight: '400',
    }}
    role="menuitem"
    tabIndex={focusedIndex === index ? 0 : -1}
  >
    {displayName}
  </NavLink>
);

const MenuColumn = ({
  title,
  items,
  menuItemsRef,
  focusedIndex,
  handleCollectionClick,
}) => {
  return (
    <div className="flex justify-between flex-col gap-8">
      <h3
        className="font-bold text-black uppercase"
        style={{
          fontSize: '20px',
          lineHeight: '20px',
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
