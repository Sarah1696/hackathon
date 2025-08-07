import { useState } from 'react'
import Footer from "../components/footer"
import Header from "../components/header"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isNotRobot, setIsNotRobot] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
  
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isNotRobot) {
            setMessage('Veuillez confirmer que vous n\'êtes pas un robot.');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...formData, rememberMe})
            });
    
            const data = await res.json();
    
            if (res.ok) {
            setMessage(`${data.message}`);
            if (rememberMe && data.token) {
                localStorage.setItem('token', data.token);
            }
            // Sauvegarder aussi les infos utilisateur
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            setTimeout(() => window.location.href = '/ideas', 1500);
            } else {
            setMessage(`${data.error}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Erreur lors de la connexion.');
        }
    };
  
    return (
        <div>
            <Header />
            <div className="form-container mt-5">
                <h3>Connexion</h3>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="robotCheck" checked={isNotRobot} onChange={(e) => setIsNotRobot(e.target.checked)} required />
                    <label className="form-check-label" htmlFor="robotCheck">Je ne suis pas un robot</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberCheck" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <label className="form-check-label" htmlFor="rememberCheck">Se souvenir de moi</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isNotRobot}>Se connecter</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
            <Footer />
        </div>
    );
}
  
export default Login;