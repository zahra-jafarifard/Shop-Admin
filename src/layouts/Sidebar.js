import { useEffect , useState } from "react";
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import { fetchDataFunction } from '../shared/FetchData';

import probg from "../assets/images/bg/download.jpg";
import { useDispatch, useSelector } from 'react-redux';

import { Logout } from "../store/actions/actions";


const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Users",
    href: "/users",
    icon: "bi bi-people",
  },
  {
    title: "Rolls",
    href: "/rolls",
    icon: "bi bi-person-bounding-box",
  },

  {
    title: "Products",
    href: "/products",
    icon: "bi bi-basket",
  },
  {
    title: "Categories",
    href: "/categories",
    icon: "bi bi-bookmarks-fill",
  },
 
  {
    title: "My Profile",
    href: "/profile",
    icon: "bi bi-person-circle",
  },
];

const Sidebar = () => {
  const [userState, setUserState] = useState([]);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.shop.userId);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFunction(`users/${userId}`)
      setUserState(data)
    }
    fetchData();
  }, [setUserState])

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

 const authHandler = (e) => {
   e.preventDefault();
    dispatch(Logout());
  };
  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          {userState.image && 
          <img 
            src={`http://localhost:5000/upload/${userState.image}`} 
          style={{height:"43px"}}
          alt="user" width="50" className="rounded-circle" />}
          
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">{userState.name} {userState.family}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="/login"
            onClick={authHandler}
          >
            Log Out
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
