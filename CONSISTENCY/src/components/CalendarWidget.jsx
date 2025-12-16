import React from 'react';

const CalendarWidget = ({ currentDate, setCurrentDate, view, setView, navigateDate, tasks }) => {
  
  // Lógica para generar los días del mes
  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Ajustar para que Lunes sea 0
    
    // Retroceder al lunes anterior
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - startDayOfWeek);

    const days = [];
    for (let i = 0; i < 42; i++) { // 6 semanas
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const daysToRender = generateDays();
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Helper para saber si un día tiene tareas
  const hasTasks = (date) => {
    const key = date.toISOString().split('T')[0];
    return tasks[key] && tasks[key].length > 0;
  };

  // Helper para saber si es hoy
  const isToday = (date) => {
      return date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
  };
  
  // Helper para saber si es el día seleccionado
  const isSelected = (date) => {
    return date.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0];
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="card-title h4 fw-semibold text-dark">Calendario</h2>
        
        <div className="btn-group">
          {['month', 'week', 'day'].map(v => (
             <button 
                key={v}
                className={`btn btn-outline-primary btn-sm ${view === v ? 'active' : ''}`}
                onClick={() => setView(v)}
             >
                {v === 'month' ? 'Mes' : v === 'week' ? 'Semana' : 'Día'}
             </button>
          ))}
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <button onClick={() => navigateDate(-1)} className="btn btn-light rounded-circle p-2">
          &lt;
        </button>
        <h3 className="h5 fw-bold text-dark text-capitalize mb-0">
          {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => navigateDate(1)} className="btn btn-light rounded-circle p-2">
          &gt;
        </button>
      </div>

      {/* Renderizado de Grid Mensual */}
      {view === 'month' && (
        <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
          {/* Cabeceras Lun-Dom */}
          {weekDays.map(day => (
            <div key={day} className="text-center fw-bold text-muted small py-2">{day}</div>
          ))}

          {/* Días */}
          {daysToRender.map((date, index) => (
            <div 
              key={index}
              onClick={() => setCurrentDate(date)}
              className={`
                p-2 text-center rounded cursor-pointer position-relative
                ${date.getMonth() !== currentDate.getMonth() ? 'text-muted opacity-50' : ''}
                ${isSelected(date) ? 'bg-primary text-white shadow' : 'hover-bg-light'}
                ${isToday(date) && !isSelected(date) ? 'border border-primary text-primary' : ''}
              `}
              style={{ cursor: 'pointer', height: '60px' }}
            >
              <span className="fw-semibold">{date.getDate()}</span>
              {hasTasks(date) && (
                <div 
                    className={`position-absolute bottom-0 start-50 translate-middle-x mb-1 rounded-circle ${isSelected(date) ? 'bg-white' : 'bg-primary'}`} 
                    style={{width: '6px', height: '6px'}}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {view !== 'month' && (
        <div className="alert alert-info text-center">
            La vista de {view === 'week' ? 'Semana' : 'Día'} está en construcción en esta versión de React.
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;