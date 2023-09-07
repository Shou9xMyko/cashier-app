import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarHomepage = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className="py-3"
        style={{ backgroundColor: "#ff4500" }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white">
            Cashier App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Cashier App
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="justify-content-end gap-3">
              <Nav.Link
                as={Link}
                to="/"
                className="mt-2 text-white homeNavTitle"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700,
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className="mt-2 text-white"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700,
                }}
              >
                About
              </Nav.Link>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/registrasi" className="btn btn-primary">
                Register
              </Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarHomepage;
