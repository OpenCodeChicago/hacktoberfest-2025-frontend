const MenuColumn = ({ title, items, createMenuItem }) => {
  return (
    <div className="flex justify-between flex-col gap-8">
      <h3
        className="font-bold text-black uppercase"
        style={{
          fontSize: '28px',
          lineHeight: '28px',
          letterSpacing: '-1.5px',
        }}
      >
        {title}
      </h3>
      <ul className="space-y-4 h-full">
        {items.map((item) => (
          <li key={item.id}>
            {createMenuItem(item.slug, item.displayName, item.index)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuColumn;
