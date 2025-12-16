import React, { useState } from 'react';

const AddTaskModal = ({ show, onClose, onSave, date }) => {
  const [taskText, setTaskText] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onSave(taskText);
      setTaskText("");
      onClose();
    }
  };

  const formattedDate = date ? date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }) : '';

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Nuevo Evento</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="text-muted small mb-3">Para el día: <span className="fw-bold text-dark">{formattedDate}</span></p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="Ej: Reunión con cliente 3pm"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light text-secondary fw-medium" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn btn-primary fw-medium px-4">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;