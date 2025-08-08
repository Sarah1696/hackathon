import { useState } from 'react'
import Footer from "../components/footer"
import Header from "../components/header"


const Register = () => {
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation côté frontend
        if (formData.password !== formData.confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
            setMessage(`${data.message}`);
            setFormData({ lastname: '', firstname: '', email: '', password: '', confirmPassword: '' });
        } else {
            setMessage(`${data.error}`);
        }
        } catch (err) {
        console.error(err);
        setMessage(`Erreur lors de l'envoi.`);
        }
    };

    return (
        <div>
        <Header />
        <div className="form-container mt-5">
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label className="form-label">Nom</label>
                <input type="text" className="form-control" name="lastname" value={formData.lastname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input type="text" className="form-control" name="firstname" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Confirmer le mot de passe</label>

                <input
                    type="password"
                    className={`form-control ${formData.confirmPassword && (formData.password === formData.confirmPassword ? 'is-valid' : 'is-invalid')}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="invalid-feedback">
                        Les mots de passe ne correspondent pas.
                    </div>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="valid-feedback">
                        Les mots de passe correspondent !
                    </div>
                )}

            </div>
            <button type="submit" className="btn btn-primary">S'inscrire</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
        <Footer />
        </div>
    );
}

export default Register;
