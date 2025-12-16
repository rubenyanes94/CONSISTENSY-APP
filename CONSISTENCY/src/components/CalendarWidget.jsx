import React from 'react';

const CalendarWidget = ({ currentDate, setCurrentDate, view, setView, navigateDate, tasks, onAddTaskClick }) => {
  
  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; 
    
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - startDayOfWeek);

    const days = [];
    for (let i = 0; i < 42; i++) { 
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const daysToRender = generateDays();
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Función para obtener color basado en el ID (para que sea consistente)
  const getTaskColor = (id) => {
    const colors = ['pill-blue', 'pill-green', 'pill-purple', 'pill-yellow'];
    return colors[id % colors.length];
  };

  const isToday = (date) => date.toDateString() === new Date().toDateString();
  const isSelected = (date) => date.toDateString() === currentDate.toDateString();

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white h-100">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="card-title h4 fw-bold text-dark mb-0">
          {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        
        <div className="d-flex gap-2">
           <button onClick={() => navigateDate(-1)} className="btn btn-outline-light text-dark border p-2 rounded-circle">
             &lt;
           </button>
           <button onClick={() => navigateDate(1)} className="btn btn-outline-light text-dark border p-2 rounded-circle">
             &gt;
           </button>
           <div className="vr mx-2"></div>
           <select className="form-select form-select-sm w-auto fw-medium" value={view} onChange={(e) => setView(e.target.value)}>
              <option value="month">Mes</option>
              <option value="week">Semana</option>
              <option value="day">Día</option>
           </select>
        </div>
      </div>

      {/* GRID CALENDARIO */}
      {view === 'month' && (
        <div className="calendar-grid flex-grow-1">
          {/* Cabeceras */}
          {weekDays.map(day => (
            <div key={day} className="day-name">{day.substring(0, 3)}</div>
          ))}

          {/* Celdas de Días */}
          {daysToRender.map((date, index) => {
             const dateKey = date.toISOString().split('T')[0];
             const dayTasks = tasks[dateKey] || [];
             const isOtherMonth = date.getMonth() !== currentDate.getMonth();

             return (
                <div 
                  key={index}
                  onClick={() => setCurrentDate(date)}
                  // Doble click para abrir modal rápido
                  onDoubleClick={() => onAddTaskClick(date)}
                  className={`calendar-day ${isOtherMonth ? 'text-muted bg-light' : ''} ${isToday(date) ? 'today' : ''} ${isSelected(date) ? 'selected' : ''}`}
                >
                  {/* Botón flotante '+' */}
                  <div 
                    className="add-btn shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddTaskClick(date);
                    }}
                  >
                    + Nuevo
                  </div>

                  {/* Número del día */}
                  <span className="day-number">{date.getDate()}</span>

                  {/* Lista de Tareas dentro de la celda (Max 3 visible) */}
                  <div className="d-flex flex-column gap-1 w-100 mt-1" style={{overflow: 'hidden'}}>
                    {dayTasks.slice(0, 3).map(task => (
                        <div 
                            key={task.id} 
                            className={`task-pill ${task.completed ? 'pill-completed' : getTaskColor(task.id)}`}
                            title={task.description}
                        >
                            {task.description}
                        </div>
                    ))}
                    {dayTasks.length > 3 && (
                        <div className="text-muted small ps-1" style={{fontSize: '0.7rem'}}>
                            + {dayTasks.length - 3} más
                        </div>
                    )}
                  </div>
                </div>
             );
          })}
        </div>
      )}
      
      {view !== 'month' && <div className="alert alert-info mt-3">Vista en desarrollo...</div>}
    </div>
  );
};

export default CalendarWidget;