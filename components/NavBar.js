/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
// import Search from './Search';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            Slack-er
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Home
                </a>
              </Link>
            </li>
            <div>
              {/* <Search /> */}
            </div>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
            <Link passHref href="/profile">
              <a>
                <img src={user.photoURL} alt="user" className="user-icon" />
              </a>
            </Link>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button className="dropdown-item" type="button">Action</button></li>
                <li><button className="dropdown-item" type="button">Another action</button></li>
                <li><button className="dropdown-item" type="button">Something else here</button></li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
