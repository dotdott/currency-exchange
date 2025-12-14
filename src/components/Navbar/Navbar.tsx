import financeIcon from "@/assets/finance-icon.svg";
import { useMemo, useState } from "react";
import "./styles.scss";

const Navbar = () => {
  const [activeRoute, setActiveRoute] = useState("Conversor");
  const makeupRoutes = useMemo(() => ["Conversor", "Current Taxs"], []);

  return (
    <header className="navbar">
      <b className="navbar__logo">
        CUR
        <span>
          RENCY <img src={financeIcon} alt="finance icon" />
        </span>
      </b>

      <nav>
        {makeupRoutes.map((route) => (
          <a
            onClick={() => setActiveRoute(route)}
            href="#"
            className={`${activeRoute === route ? "active" : ""}`}
          >
            {route}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
