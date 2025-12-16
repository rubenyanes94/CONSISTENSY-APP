import React from 'react';
import { NavLink } from 'react-router-dom'; // Importamos NavLink

const Navbar = ({ dailyProgress }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid container-lg">
        <NavLink className="navbar-brand fw-bold" to="/" style={{ color: '#4F46E5', fontSize: '1.5rem' }}>
          Routine Flow
        </NavLink>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* BARRA DE PROGRESO INTEGRADA EN EL MENÚ */}
          <div className="d-flex flex-column w-50 mx-auto my-2 my-lg-0">
             <div className="d-flex justify-content-between small text-muted mb-1">
                <span>Progreso Diario</span>
                <span className="fw-bold">{Math.round(dailyProgress)}%</span>
             </div>
             <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${dailyProgress}%`, transition: 'width 0.5s ease' }}
                    aria-valuenow={dailyProgress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                ></div>
             </div>
          </div>

          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
             {/* Enlaces de Navegación */}
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link fw-medium ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `nav-link fw-medium ${isActive ? 'text-primary fw-bold' : 'text-secondary'}`}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
               {/* Avatar pequeño */}
               <div className="bg-light rounded-circle p-1 border">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" width="32" height="32" alt="User" />
               </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;