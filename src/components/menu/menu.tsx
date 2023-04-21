import { Link, NavLink } from "react-router-dom";
import "./menu.css";

export type MenuOption = {
  label: string;
  path: string;
};
export const menuOptions: MenuOption[] = [
  { label: "Home", path: "/home" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Movements", path: "/productmovements" },
];

export type MenuProps = {
  options: MenuOption[];
};

export function Menu({ options }: MenuProps) {
  return (
    <div className="menu__container">
      <nav className="menu__nav">
        <ul className="menu__list">
          {menuOptions.map((item) => (
            <li
              key={item.label}
              className="menu__option menu__option_notSelected"
            >
              <NavLink
                to={item.path as string}
                className="menu__link"
                style={(isActive) => ({
                  color: isActive ? "white" : "white",
                })}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
