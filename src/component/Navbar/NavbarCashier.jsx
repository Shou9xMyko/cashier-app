import { useState } from "react";
import "./NavbarCashier.css";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../redux/action/action";
import { BiSolidUser } from "react-icons/bi";

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavbarCashier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    localStorage.setItem("isLogin", "false");
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(searchProduct(searchValue));
  };

  return (
    <>
      <Navbar expand="xl" className="navbar">
        <Container>
          <Navbar.Brand className="navbar-brand text-white">
            {localStorage.getItem("nama_cafe") != null ? (
              localStorage?.getItem("nama_cafe")
            ) : (
              <>Cashier App</>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                Cashier App
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link
                  className="text-white nav-link"
                  onClick={() =>
                    window.open(
                      "https://api.whatsapp.com/send?phone=085215702200"
                    )
                  }
                >
                  Hubungi Developer
                </Nav.Link>
              </Nav>
              <Form
                onSubmit={handleSubmit}
                className="form-search d-flex justify-content-end"
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-3 shadow-none"
                  aria-label="Search"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button type="submit" className="btn-cari btn m-0">
                  Cari
                </Button>
              </Form>
              {localStorage.getItem("username") != null && (
                <Dropdown>
                  <Dropdown.Toggle className="ms-2" id="dropdown-icon">
                    <BiSolidUser className="fs-4" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCashier;
