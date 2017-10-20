import React from 'react';
import { Link } from 'react-router';
// import PropTypes from 'prop-types';

import User from './User';

import styles from './header.scss';

class Header extends React.Component {
  static propTypes = {
    // loggedIn: PropTypes.bool.isRequired,
  }

  constructor() {
    super();

    this.state = { showMenu: false };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    const navStateClass = (this.state.showMenu) ? styles.showMenu : '';

    return (
      <header className={styles.wrapper}>
        <div className={styles.container}>
          <Link to="/" title="home" className={styles.title}>
            <h1>Rounder</h1>
          </Link>

          <nav className={`${styles.main} ${navStateClass}`}>
            <switch className={styles.hamburger} onClick={this.toggleMenu}>
              <i className="icon-menu" />
            </switch>

            <ul className={styles.nav}>
              <li><Link to="/one">One</Link></li>
              <li><Link to="/two">Two</Link></li>
              <li><Link to="/three">Three</Link></li>
            </ul>
            <User />
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
