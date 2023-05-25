import { Link } from "react-router-dom";
import "./menu.css";
import { useCollections } from "../../hooks/use.collections";
import { CollectionsRepo } from "../../services/repositories/collection.repo";

export type MenuOption = {
  label: string;
  path: string;
};
export const menuOptions: MenuOption[] = [
  { label: "Home", path: "/home" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Movements", path: "/productmovements" },
  { label: "All Collections", path: "/collections/readrecords/products" },
];

export type MenuProps = {
  options: MenuOption[];
};

export function Menu({ options }: MenuProps) {
  const repoCollection = new CollectionsRepo();
  const { translate } = useCollections(repoCollection);
  return (
    <div className="menu__container">
      <nav className="menu__nav">
        <ul className="menu__list">
          {menuOptions.map((item) => (
            <li
              key={item.label}
              className="menu__option menu__option_notSelected"
            >
              <Link
                to={item.path as string}
                className="menu__link"
                // style={(isActive) => ({
                //   color: isActive ? "white" : "white",
                // })}
              >
                {translate(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
