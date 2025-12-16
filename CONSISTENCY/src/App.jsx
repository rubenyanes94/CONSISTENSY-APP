import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CalendarWidget from './components/CalendarWidget';
import TaskList from './components/TaskList';
import SidebarAI from './components/SidebarAI';
import Dashboard from './components/Dashboard';
import AddTaskModal from './components/AddTaskModal'; // Importamos el Modal
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // --- 1. ESTADOS PRINCIPALES ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('routineFlowTasks');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [loading, setLoading] = useState(false);

  // Estados para el Modal de Agregar Tarea
  const [showModal, setShowModal] = useState(false);
  const [modalDate, setModalDate] = useState(new Date());

  // --- 2. EFECTOS (Persistencia) ---
  useEffect(() => {
    localStorage.setItem('routineFlowTasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- 3. UTILIDADES ---
  const formatDateKey = (date) => date.toISOString().split('T')[0];

  const calculateDailyProgress = () => {
    const dateKey = formatDateKey(currentDate);
    const daysTasks = tasks[dateKey] || [];
    if (daysTasks.length === 0) return 0;
    
    const completed = daysTasks.filter(t => t.completed).length;
    return (completed / daysTasks.length) * 100;
  };

  const dailyProgress = calculateDailyProgress();

  // --- 4. GESTIÓN DE TAREAS (CRUD) ---
  
  // Agregar tarea (Por defecto usa currentDate, pero puede recibir una fecha específica)
  const addTask = (taskDescription, dateOverride = null) => {
    const targetDate = dateOverride || currentDate;
    const dateKey = formatDateKey(targetDate);
    
    const newTask = { 
      id: Date.now(), 
      description: taskDescription, 
      completed: false 
    };

    setTasks(prev => ({ 
      ...prev, 
      [dateKey]: [...(prev[dateKey] || []), newTask] 
    }));
  };

  const toggleTask = (taskId) => {
    const dateKey = formatDateKey(currentDate);
    if (!tasks[dateKey]) return;

    setTasks(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const deleteTask = (taskId) => {
    const dateKey = formatDateKey(currentDate);
    setTasks(prev => {
      const updatedList = prev[dateKey].filter(t => t.id !== taskId);
      return { ...prev, [dateKey]: updatedList };
    });
  };

  // --- 5. NAVEGACIÓN CALENDARIO ---
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(newDate.getMonth() + direction);
    else if (view === 'week') newDate.setDate(newDate.getDate() + (direction * 7));
    else newDate.setDate(newDate.getDate() + direction);
    
    setCurrentDate(newDate);
  };

  // --- 6. HANDLERS DEL MODAL ---
  const handleOpenModal = (date) => {
    setModalDate(date); // Guardamos la fecha donde se hizo clic
    setCurrentDate(date); // Actualizamos la vista principal a ese día
    setShowModal(true);   // Abrimos modal
  };

  const handleSaveFromModal = (taskText) => {
    // Usamos modalDate para asegurar que la tarea va al día correcto
    addTask(taskText, modalDate); 
  };

  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        
        {/* Navbar con Barra de Progreso */}
        <Navbar dailyProgress={dailyProgress} />

        <div className="container-fluid px-5 my-5">
          
          <Routes>
            {/* --- RUTA INICIO --- */}
            <Route path="/" element={
              <>
                <header className="text-center mb-5">
                  <p className="lead text-secondary">Consistencia y Productividad impulsada por AI</p>
                </header>

                <div className="row g-4">
                  {/* Columna Principal: Calendario + Lista */}
                  <div className="col-lg-8">
                    <div className="d-flex flex-column gap-4 h-100">
                      
                      {/* Calendario Interactivo */}
                      <CalendarWidget 
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        view={view}
                        setView={setView}
                        navigateDate={navigateDate}
                        tasks={tasks}
                        onAddTaskClick={handleOpenModal} // Pasamos la función para abrir modal
                      />

                      {/* Lista de Tareas con AI input */}
                      <TaskList 
                        currentDate={currentDate}
                        tasks={tasks[formatDateKey(currentDate)] || []}
                        onAdd={(text) => addTask(text)} // Wrapper simple
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </div>
                  </div>

                  {/* Columna Lateral: AI & Tips */}
                  <div className="col-lg-4">
                    <SidebarAI 
                      tasks={tasks} 
                      loading={loading} 
                      setLoading={setLoading} 
                    />
                  </div>
                </div>
              </>
            } />

            {/* --- RUTA DASHBOARD --- */}
            <Route path="/dashboard" element={
               <Dashboard tasks={tasks} />
            } />
          </Routes>

        </div>
        
        {/* --- MODALES GLOBALES --- */}
        
        {/* 1. Modal para añadir tarea desde calendario */}
        <AddTaskModal 
            show={showModal} 
            onClose={() => setShowModal(false)} 
            onSave={handleSaveFromModal}
            date={modalDate}
        />

        {/* 2. Modal de Carga (Overlay) */}
        {loading && (
          <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0 shadow-lg">
                      <div className="modal-body text-center p-4">
                          <div className="spinner-border text-primary" role="status"></div>
                          <p className="mt-3 fw-medium text-dark">Procesando con AI...</p>
                      </div>
                  </div>
              </div>
          </div>
        )}

      </div>
    </BrowserRouter>
  );
}

export default App;