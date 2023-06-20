import Link from "next/link"
import { Navbar, Container, Nav } from "react-bootstrap"

export default function NavbarComp() {
    return (
        <Navbar className="mb-3" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Yudi Gunawan</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} href="/post-list">Blog List</Nav.Link>
                    <Nav.Link as={Link} href="/user">User</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}