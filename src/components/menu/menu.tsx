import { Link } from "react-router-dom";
import "./menu.css";
import { useApp } from "../../hooks/use.app";
import { SyntheticEvent } from "react";

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
  const { updateUrl } = useApp();
  const handlerClick = (event: SyntheticEvent) => {
    const menuOptionSelected = event.currentTarget;
    updateUrl(menuOptionSelected.innerHTML.split("href=")[1].split(">")[0]);
  };
  return (
    <div className="menu__container">
      <nav className="menu__nav">
        <ul className="menu__list">
          {menuOptions.map((item) => (
            <li
              key={item.label}
              className="menu__option menu__option_notSelected"
              onClick={handlerClick}
            >
              <Link to={item.path as string} className="menu__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
function updateUrl(arg0: string): any {
  throw new Error("Function not implemented.");
}
