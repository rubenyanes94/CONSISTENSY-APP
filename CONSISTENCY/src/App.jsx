import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CalendarWidget from './components/CalendarWidget';
import TaskList from './components/TaskList';
import SidebarAI from './components/SidebarAI';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // --- ESTADOS (Equivalente a tus variables globales) ---
  const [tasks, setTasks] = useState(() => {
    // Carga inicial desde LocalStorage
    const saved = localStorage.getItem('routineFlowTasks');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [loading, setLoading] = useState(false); // Para simulaciones de AI

  // --- EFECTOS (Persistencia) ---
  useEffect(() => {
    localStorage.setItem('routineFlowTasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- UTILIDADES ---
  const formatDateKey = (date) => date.toISOString().split('T')[0];

  // --- MANEJADORES DE TAREAS ---
  const addTask = (taskDescription) => {
    const dateKey = formatDateKey(currentDate);
    const newTask = { 
      id: Date.now(), // ID único
      description: taskDescription, 
      completed: false 
    };

    setTasks(prevTasks => ({
      ...prevTasks,
      [dateKey]: [...(prevTasks[dateKey] || []), newTask]
    }));
  };

  const toggleTask = (taskId) => {
    const dateKey = formatDateKey(currentDate);
    setTasks(prevTasks => ({
      ...prevTasks,
      [dateKey]: prevTasks[dateKey].map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const deleteTask = (taskId) => {
    const dateKey = formatDateKey(currentDate);
    setTasks(prevTasks => {
      const updatedList = prevTasks[dateKey].filter(t => t.id !== taskId);
      // Si la lista queda vacía, podríamos borrar la key, pero dejarla vacía está bien por ahora
      return { ...prevTasks, [dateKey]: updatedList };
    });
  };

  // --- MANEJADORES DE CALENDARIO ---
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(newDate.getMonth() + direction);
    else if (view === 'week') newDate.setDate(newDate.getDate() + (direction * 7));
    else newDate.setDate(newDate.getDate() + direction);
    
    setCurrentDate(newDate);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <div className="container my-5">
        <header className="text-center mb-5">
          <p className="lead text-secondary">Consistencia y Productividad impulsada por AI</p>
        </header>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              
              <CalendarWidget 
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                view={view}
                setView={setView}
                navigateDate={navigateDate}
                tasks={tasks} // Pasamos tareas para mostrar los puntos en el calendario
              />

              <TaskList 
                currentDate={currentDate}
                tasks={tasks[formatDateKey(currentDate)] || []}
                onAdd={addTask}
                onToggle={toggleTask}
                onDelete={deleteTask}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <SidebarAI 
              tasks={tasks} 
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
      
      {/* Modal de Carga Global (Opcional) */}
      {loading && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center p-4">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2">Procesando con AI...</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;