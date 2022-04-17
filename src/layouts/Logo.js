import { ReactComponent as LogoDark } from "../assets/images/logos/materialpro.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      {/* <LogoDark /> */}
      <div >
        <i className="bi bi-bag-check" style={{ color: "silver", paddingLeft: "10px", fontSize: "28px" }}>
          <label style={{ color: "silver", padding: "0 0px 0 10px", fontFamily: 'cursive', fontSize: "16px" }}>
            ZAHRA's SHOP
          </label>
        </i>
      </div>
    </Link>
  );
};

export default Logo;
