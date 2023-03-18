/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from './images/logo.png';
import SearchBar from './Searchbar';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/usersData';

export default function NavBar() {
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState({});
  const getProfilePic = () => {
    getUser(user.uid).then(setProfilePic);
  };

  useEffect(() => {
    getProfilePic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Navbar id="navbar" collapseOnSelect expand="lg" className="color-nav" variant="dark" style={{ fontSize: '15px', fontFamily: 'sans-serif' }}>
      <Container>
        <Link passHref href="/">
          {/*
          // eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link passHref href="/">
                <Nav.Link>Babysitters</Nav.Link>
              </Link>
              <Link passHref href="/tasklists/new">
                <Nav.Link>Create Tasklist</Nav.Link>
              </Link>
              <Link passHref href="/bookings/new">
                <Nav.Link>Create Booking</Nav.Link>
              </Link>
              <SearchBar />
              <Link passHref href="/profile">
                <Nav.Link className="navbar-brand" style={{ marginLeft: '500px' }}>
                  <img src={profilePic.image} alt="img" width="40px" height="40px" style={{ borderRadius: '60em' }} id="navbar-profile-image" />
                </Nav.Link>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
