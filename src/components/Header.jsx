import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="global-header">
      <div className="header-container">
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`header-link ${location.pathname === '/' ? 'is-active' : ''}`}
          >
            Inicio
          </Link>
          <Link 
            to="/asistentes-virtuales" 
            className={`header-link ${location.pathname === '/asistentes-virtuales' ? 'is-active' : ''}`}
          >
            Asistentes Virtuales
          </Link>
          <Link 
            to="/crm-omnicanal" 
            className={`header-link ${location.pathname === '/crm-omnicanal' ? 'is-active' : ''}`}
          >
            CRM Omnicanal
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
