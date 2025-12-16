import React, { useState } from 'react';

const TaskList = ({ currentDate, tasks, onAdd, onToggle, onDelete, loading, setLoading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  // Simulación de "Desglosar con AI"
  const handleAiRefine = async () => {
    if (!inputValue.trim()) return alert("Escribe una tarea primero");
    setLoading(true);
    
    // Simulamos espera
    setTimeout(() => {
      const steps = [
        `Paso 1: Planificar ${inputValue}`,
        `Paso 2: Ejecutar primera parte de ${inputValue}`,
        `Paso 3: Revisar ${inputValue}`
      ];
      steps.forEach(step => onAdd(step));
      setInputValue("");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <h2 className="card-title h4 fw-semibold text-dark mb-3">
        Tareas para: <span className="text-primary fw-bold">
            {currentDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </h2>
      
      <div className="input-group mb-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Añadir tarea..." 
          className="form-control form-control-lg rounded-start-3"
          disabled={loading}
        />
        <button 
          onClick={handleAiRefine}
          className="btn btn-warning btn-lg fw-medium text-primary"
          style={{ backgroundColor: '#FBBF24' }}
          disabled={loading}
        >
          ✨ AI
        </button>
        <button 
          onClick={handleAdd} 
          className="btn btn-primary btn-lg fw-medium rounded-end-3"
          disabled={loading}
        >
          Añadir
        </button>
      </div>
      
      <ul className="list-unstyled space-y-2">
        {tasks.length === 0 && (
            <p className="text-muted text-center py-4">No hay tareas para hoy.</p>
        )}
        
        {tasks.map((task) => (
          <li key={task.id} className={`d-flex align-items-center p-2 rounded ${task.completed ? 'bg-light' : ''}`}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => onToggle(task.id)}
              className="form-check-input me-3" 
            />
            <span className={`me-auto ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
              {task.description}
            </span>
            <button 
              onClick={() => onDelete(task.id)}
              className="btn btn-outline-danger btn-sm"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;