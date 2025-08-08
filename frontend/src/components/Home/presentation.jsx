import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Presentation = () => {
    const [totalIdeas, setTotalIdeas] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/api/ideas/getIdeas")
            .then(res => res.json())
            .then(data => setTotalIdeas(data.length))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className="container">
            <div className="text-center py-4">
                <img src="../../../public/boite_a_idee.png" alt="ampoule" />
                <img src="../../../public/images.jpg"  alt="boites à idée" />
                <img src="../../../public/boite_a_idee.png" alt="ampoule" />

                {/* Slogan principal */}
                <h2 className="mt-4 mb-3 text-primary fw-bold">
                    Ensemble, construisons un monde accessible à tous
                </h2>

                {/* Sous-titre */}
                <p className="lead text-muted mb-4">
                    Partagez vos idées, inspirez le changement
                </p>

                {/* Bouton d'action */}
                <Link to="/ideas" className="btn btn-primary btn-lg mb-3">
                    💡 Partager mon idée
                </Link>

                {/* Compteur */}
                <p className="text-muted">
                    <strong>{totalIdeas}</strong> idées déjà partagées
                </p>
            </div>
            <ul className="m-5">
                <li>✅ Offrons à chacun la possibilité de proposer des solutions concrètes pour un monde plus accessible.</li>
                <li>✅ Un espace dédié à la collecte, au partage et à l’amélioration des idées pour l’accessibilité de tous.</li>
                <li>✅ Centralisons les initiatives pour rendre notre environnement plus inclusif, ensemble et efficacement.</li>
                <li>Facilitons l’expression des besoins en matière d’accessibilité pour mieux y répondre collectivement.</li>
                <li> Une plateforme sobre et engagée pour faire émerger des idées utiles à l’accessibilité </li>
            </ul>
            <hr />
        </div>

    )
}

export default Presentation