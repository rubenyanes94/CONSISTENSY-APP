import React, { useState } from 'react';

const SidebarAI = ({ tasks, loading, setLoading }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [evaluation, setEvaluation] = useState(null);

  const aiTips = [
    "Regla de los 2 minutos: si toma menos de 2 min, hazlo ya.",
    "Come esa rana: Haz lo difícil primero.",
    "Bloquea tiempo: 30 min de Deep Work."
  ];

  const handleGetTip = () => {
    setLoading(true);
    setTimeout(() => {
        const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)];
        setRecommendation(randomTip);
        setLoading(false);
    }, 1000);
  };

  const handleEvaluation = () => {
    setLoading(true);
    setTimeout(() => {
        // Cálculo real basado en las props 'tasks'
        let total = 0;
        let completed = 0;
        Object.values(tasks).forEach(dayTasks => {
            dayTasks.forEach(t => {
                total++;
                if(t.completed) completed++;
            });
        });
        
        const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        let msg = "";
        if (rate >= 75) msg = "¡Excelente disciplina! Sigue así.";
        else if (rate >= 45) msg = "Vas bien, pero considera terapia cognitivo-conductual si te estancas.";
        else msg = "Consistencia baja. Busca ayuda profesional para desbloquearte.";

        setEvaluation({ rate, msg });
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* AI Box */}
      <div className="p-4 rounded-4 shadow-lg bg-white">
        <h2 className="h5 fw-semibold mb-3">🤖 AI & Tips</h2>
        
        {recommendation ? (
            <div className="alert alert-info border-0 small">{recommendation}</div>
        ) : (
            <div className="small text-muted">Solicita un tip diario.</div>
        )}
        
        <button 
          onClick={handleGetTip}
          disabled={loading}
          className="mt-3 w-100 btn btn-success fw-bold rounded-3 shadow-sm text-white"
        >
          Generar Recomendación
        </button>
      </div>

      {/* Evaluation Box */}
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <h2 className="card-title h5 fw-semibold text-dark mb-3">Evaluación Mensual</h2>
        
        {evaluation && (
            <div className={`alert ${evaluation.rate < 50 ? 'alert-danger' : 'alert-success'} border-0 small`}>
                <strong>{evaluation.rate}% Completado.</strong> <br/>
                {evaluation.msg}
            </div>
        )}

        <button 
            onClick={handleEvaluation}
            disabled={loading}
            className="w-100 btn btn-danger fw-bold rounded-3 shadow-sm"
        >
          Generar Evaluación
        </button>
      </div>
    </div>
  );
};

export default SidebarAI;