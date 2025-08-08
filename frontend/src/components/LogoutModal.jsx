// Composant modal pour confirmer la déconnexion

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const handleLogout = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users/logout', {
                method: 'GET',
                credentials: 'include' // Pour envoyer les cookies
            });

            if (res.ok) {
                // Rediriger vers la page d'accueil après déconnexion
                window.location.href = '/';
            } else {
                console.error('Erreur lors de la déconnexion');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
        
        onConfirm(); // Fermer le modal
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmation de déconnexion</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center">
                            <i className="bi bi-question-circle text-warning" style={{ fontSize: '3rem' }}></i>
                            <h6 className="mt-3">Êtes-vous sûr de vouloir vous déconnecter ?</h6>
                            <p className="text-muted">Vous devrez vous reconnecter pour accéder à votre compte.</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={handleLogout}
                        >
                            Oui, me déconnecter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
