const BurgerMenu = ({ onToggleMenu, ref, isMenuOpen }) => {
  return (
    <div className="hidden absolute top-3 left-3 max-md:block">
      <label
        htmlFor="menu"
        className="flex flex-col gap-1.5 w-8 cursor-pointer"
      >
        <input
          type="checkbox"
          className="hidden peer"
          id="menu"
          onChange={onToggleMenu}
          ref={ref}
          checked={isMenuOpen}
        />
        <span className="burger-span peer-checked:rotate-45 peer-checked:translate-y-2 peer-checked:w-6"></span>
        <span className="burger-span peer-checked:opacity-0"></span>
        <span className="burger-span peer-checked:-rotate-45 peer-checked:-translate-y-2 peer-checked:w-6"></span>
      </label>
    </div>
  );
};

export default BurgerMenu;
