const BurgerMenu = ({ onToggleMenu, ref, isMenuOpen }) => {
  return (
    <div
      className={`hidden absolute top-4 left-4 max-md:block z-50 transition-transform duration-300 ${isMenuOpen ? "translate-x-[56vw]" : "translate-x-0"}`}
    >
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
        <span className="burger-span peer-checked:rotate-45 peer-checked:translate-y-2 peer-checked:w-6 "></span>
        <span className="burger-span peer-checked:opacity-0"></span>
        <span className="burger-span peer-checked:-rotate-45 peer-checked:-translate-y-2 peer-checked:w-6 "></span>
      </label>
    </div>
  );
};

export default BurgerMenu;
