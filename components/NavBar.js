/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark .me-auto .ml-auto">
      <div className="container-fluid navbarContents">
        <Link passHref href="/">
          <h3 className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            <b>Slack-er</b>
          </h3>
        </Link>

        <div className="navbarProfile" id="navbarTogglerDemo01">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                <img src={user.photoURL} width="30px" height="30px" alt="user" className="user-icon" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <div className="profileDropdownBottomDiv">
                  <ProfileDropdown />
                  <button type="button" className="signOutBtn btn" onClick={signOut}>
                    Sign Out
                  </button>
                  <Link passHref href="/profile">
                    <button type="button" className="profileBtn btn">
                      Profile
                    </button>
                  </Link>
                </div>
              </ul>
            </li>
            <div />
          </ul>
        </div>
      </div>
    </nav>
  );
}
