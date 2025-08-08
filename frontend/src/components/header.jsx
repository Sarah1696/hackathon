import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import LogoutModal from "./LogoutModal"

const Header = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        setIsLoggedIn(!!token);
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Erreur parsing user data:', error);
            }
        }
    }, []);

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = async () => {
        try {
            await fetch('http://localhost:3000/api/users/logout', {
                method: 'GET',
                credentials: 'include'
            });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setUser(null);
            setShowLogoutModal(false);
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setUser(null);
            setShowLogoutModal(false);
            window.location.href = '/';
        }
    };
    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                background: 'linear-gradient(135deg, #4a90e2 0%, #50c878 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '12px 0'
            }}
        >
            <div className="container">
                <Link
                    className="navbar-brand"
                    to="/"
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.4rem',
                        textDecoration: 'none'
                    }}
                >
                    💡 Boîte à Idées
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/ideas"
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                📝 Idées
                            </Link>
                        </li>

                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/register"
                                        style={{
                                            color: 'white',
                                            fontWeight: '500',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                        👤 Créer un compte
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/login"
                                        style={{
                                            color: 'white',
                                            fontWeight: '500',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: '1px solid white',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = 'white';
                                            e.target.style.color = '#4a90e2';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = 'white';
                                        }}
                                    >
                                        🔐 Se Connecter
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {user && (
                                    <li className="nav-item">
                                        <span
                                            className="nav-link"
                                            style={{
                                                color: 'white',
                                                fontWeight: '500',
                                                padding: '8px 16px'
                                            }}
                                        >
                                            👋 Bonjour {user.name}
                                        </span>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#"
                                        onClick={handleLogoutClick}
                                        style={{
                                            color: 'white',
                                            fontWeight: '500',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(255,255,255,0.5)',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                        🚪 Déconnexion
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Modal de confirmation logout */}
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
            />
        </nav>
    )
}

export default Header