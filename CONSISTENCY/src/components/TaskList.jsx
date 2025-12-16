import React, { useState } from 'react';

const TaskList = ({ currentDate, tasks, onAdd, onToggle, onDelete, loading, setLoading }) => {
  const [inputValue, setInputValue] = useState("");

  // Manejar la adición manual de tareas
  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  // Permitir añadir con la tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  // Simulación de "Desglosar con AI"
  const handleAiRefine = async () => {
    if (!inputValue.trim()) {
      alert("Por favor, escribe una tarea primero para que la AI pueda desglosarla.");
      return;
    }

    setLoading(true); // Activa el spinner de carga en App.jsx
    
    // Simulamos una espera de 2 segundos (como si consultara a una API real)
    setTimeout(() => {
      const baseTask = inputValue;
      const steps = [
        `Paso 1: Planificar "${baseTask}"`,
        `Paso 2: Ejecutar primera parte de "${baseTask}"`,
        `Paso 3: Revisar y finalizar "${baseTask}"`
      ];
      
      // Añadimos las 3 sub-tareas generadas
      steps.forEach(step => onAdd(step));
      
      setInputValue(""); // Limpiamos el input
      setLoading(false); // Desactivamos el spinner
    }, 2000);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
      {/* Título con fecha dinámica */}
      <h2 className="card-title h4 fw-semibold text-dark mb-3">
        Tareas para: <span className="text-primary fw-bold text-capitalize">
            {currentDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </h2>
      
      {/* Input y Botones */}
      <div className="input-group mb-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Añadir tarea, ej: 'Presentación del proyecto'" 
          className="form-control form-control-lg rounded-start-3"
          disabled={loading}
        />
        <button 
          onClick={handleAiRefine}
          className="btn btn-warning btn-lg fw-medium flex-shrink-0"
          style={{ backgroundColor: '#FBBF24', color: '#4F46E5', border: 'none' }}
          disabled={loading}
          title="Desglosar tarea con Inteligencia Artificial"
        >
          ✨ AI
        </button>
        <button 
          onClick={handleAdd} 
          className="btn btn-primary btn-lg fw-medium rounded-end-3 flex-shrink-0"
          disabled={loading}
        >
          Añadir
        </button>
      </div>
      
      {/* Lista de Tareas */}
      <ul className="list-unstyled space-y-2">
        {tasks.length === 0 && (
            <p className="text-muted text-center py-4">No hay tareas para hoy. ¡Añade una!</p>
        )}
        
        {tasks.map((task) => (
          <li 
            key={task.id} 
            // AQUÍ aplicamos tus estilos personalizados: .task-item
            // Si está completada, añadimos .task-completed para que el CSS tache el texto
            className={`task-item d-flex align-items-center ${task.completed ? 'task-completed' : ''}`}
          >
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => onToggle(task.id)}
              className="form-check-input me-3" 
              style={{ cursor: 'pointer' }}
            />
            
            {/* .task-text es clave para que tu CSS funcione (tachado, color gris) */}
            <span className="task-text me-auto">
              {task.description}
            </span>

            {/* El botón eliminar se ocultará automáticamente si la tarea está completa gracias a tu CSS */}
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