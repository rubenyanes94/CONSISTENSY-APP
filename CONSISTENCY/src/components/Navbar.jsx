const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid container-lg">
        <a className="navbar-brand fw-bold" href="#" style={{ color: '#4F46E5', fontSize: '1.5rem' }}>
          Routine Flow
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item me-3">
              <a className="nav-link text-secondary" href="#">
                Buscar
              </a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link text-primary fw-medium" href="#">
                Suscripción
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary rounded-pill fw-medium px-4">
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;