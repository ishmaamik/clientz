// src/pages/CQuizResultsPage.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CQuizResultsPage() {
    const location = useLocation();
    const { passed } = location.state || { passed: false };

    return (
        <div className="results-page">
            <h1 className="text-center">{passed ? "Congratulations, You Passed!" : "Quiz Failed, Try Again!"}</h1>
            <div className="text-center">
                {passed ? (
                    <Link to="/courses/c/variables" className="btn btn-success">Continue Learning</Link>
                ) : (
                    <button onClick={() => window.history.back()} className="btn btn-danger">Retake Quiz</button>
                )}
            </div>
        </div>
    );
}

export default CQuizResultsPage;
