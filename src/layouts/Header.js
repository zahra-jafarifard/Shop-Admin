import React, { useEffect, useState } from "react";

import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFunction } from '../shared/FetchData';

import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import { Logout } from "../store/actions/actions";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [userState, setUserState] = useState([]);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(state => state.shop.userId);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFunction(`users/${userId}`)
      setUserState(data)
    }
    fetchData();
  }, [setUserState])
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const authHandler = () => {
    dispatch(Logout());
    { !userId && navigate('/login') }

  };

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar >
          <NavItem>
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </NavItem>

          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Rolls
            </DropdownToggle>
            <DropdownMenu end>
              <Link to="/rolls" className="nav-link">
                <DropdownItem>Rolls</DropdownItem>
              </Link>

              <DropdownItem divider />

              <Link to="/categories" className="nav-link">
                <DropdownItem>Category</DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>

        </Nav>
        <Nav>

          <NavItem >
            <Link to="/login"
              style={{ color: 'silver' }}
              className="nav-link"
              onClick={authHandler}>
              {userId ? 'LOG OUT' : 'LOG IN'}
            </Link>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          
          <DropdownToggle color="transparent">
            {userState.image && <img
              src={`http://localhost:5000/upload/${userState.image}`}
              alt="profile"
              className="rounded-circle"
              width="32"
              style={{ height: "33px" }}

            />}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>

            <NavItem style={{ margin: '-10px -15px -15px -15px' }}>
              <Link to="/profile" className="nav-link">
                <DropdownItem >My Account</DropdownItem>
              </Link>
            </NavItem>

            <NavItem style={{ margin: '-10px -15px -12px -15px' }}>
              <Link to={`/edit-user/?userId=${userId}`} className="nav-link">
                <DropdownItem>Edit Profile</DropdownItem>
              </Link>
            </NavItem>

            <DropdownItem divider />

            <NavItem style={{ margin: '-10px -15px -15px -15px' }}>
              <Link to={'/products'} className="nav-link">
                <DropdownItem>My Products</DropdownItem>
              </Link>
            </NavItem>

            <NavItem onClick={authHandler} style={{ margin: '-10px -15px -12px -15px' }}>
              <Link to={'/products'}  className="nav-link">
                <DropdownItem>Log Out</DropdownItem>
              </Link>
            </NavItem>

          </DropdownMenu>
        </Dropdown>

      </Collapse>


    </Navbar>
  );
};

export default Header;
