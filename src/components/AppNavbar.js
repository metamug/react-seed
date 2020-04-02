import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  render() {
    return (
      <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
        <a class='navbar-brand' href='/'>
          Navbar
        </a>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <ul class='navbar-nav ml-auto mr-5'>
          <li class='nav-item active'>
            <Link to='/table' className='nav-link'>
              Table <span className='sr-only'>(current)</span>
            </Link>
          </li>
          <li class='nav-item active'>
            <Link to='/form' className='nav-link'>
              Form <span className='sr-only'>(current)</span>
            </Link>
          </li>
          <li class='nav-item active'>
            <Link to='/graph' className='nav-link'>
              Graph <span className='sr-only'>(current)</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
