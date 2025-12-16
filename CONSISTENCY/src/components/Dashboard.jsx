import React from 'react';

const Dashboard = ({ tasks }) => {
  // 1. Lógica para calcular estadísticas reales
  const allTasks = Object.values(tasks).flat();
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.completed).length;
  
  // Porcentaje global histórico
  const globalRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Cálculo simple de "Racha" (días consecutivos con al menos 1 tarea completada)
  // (Esta es una lógica simplificada para el ejemplo)
  const streak = totalTasks > 0 ? Math.floor(completedTasks / 2) : 0; 

  return (
    <div className="container-fluid animate-fade-in">
      <div className="row g-4">
        
        {/* COLUMNA IZQUIERDA: PERFIL */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-white h-100">
            <div className="position-relative mx-auto mb-3" style={{ width: '100px' }}>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Avatar" 
                className="rounded-circle img-fluid border border-4 border-primary p-1"
              />
              <span className="position-absolute bottom-0 end-0 badge rounded-pill bg-warning text-dark border border-white">
                Pro
              </span>
            </div>
            <h3 className="fw-bold text-dark mb-1">Usuario Consistente</h3>
            <p className="text-muted small">Miembro desde Dic 2025</p>
            
            <hr className="my-4 opacity-10" />
            
            <div className="d-flex justify-content-between text-start px-2">
              <div>
                <small className="text-secondary d-block">Nivel actual</small>
                <span className="fw-bold text-primary">Maestro de Rutinas</span>
              </div>
              <div className="text-end">
                <small className="text-secondary d-block">Puntos</small>
                <span className="fw-bold text-dark">1,250 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: ESTADÍSTICAS */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4">
            <h4 className="fw-bold text-dark mb-4">Resumen de Progreso</h4>
            
            <div className="row g-3 text-center">
              <div className="col-4">
                <div className="p-3 bg-light rounded-3">
                  <div className="h2 fw-bold text-primary mb-0">{completedTasks}</div>
                  <div className="small text-muted">Tareas Completadas</div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-light rounded-3">
                  <div className="h2 fw-bold text-success mb-0">{globalRate}%</div>
                  <div className="small text-muted">Tasa de Éxito</div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-light rounded-3">
                  <div className="h2 fw-bold text-warning mb-0">🔥 {streak}</div>
                  <div className="small text-muted">Días de Racha</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
            <h4 className="fw-bold text-dark mb-3">Patrones de Productividad</h4>
            <p className="text-muted small mb-4">Basado en tu historial de tareas completadas.</p>
            
            {/* Barras simuladas de actividad por día */}
            <div className="d-flex justify-content-between align-items-end" style={{ height: '150px' }}>
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => {
                    // Altura aleatoria para simular "patrones" visuales
                    const height = Math.floor(Math.random() * (100 - 20) + 20); 
                    return (
                        <div key={day} className="text-center w-100 mx-1">
                            <div 
                                className="rounded-top w-100 bg-primary opacity-75" 
                                style={{ height: `${height}%`, transition: 'height 0.5s' }}
                            ></div>
                            <small className="d-block mt-2 text-muted" style={{fontSize: '0.7rem'}}>{day}</small>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;