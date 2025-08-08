import { useState, useEffect } from "react";

const InputIdea = ({ onNewIdea }) => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState(1);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/categories/getCategories")
            .then(res => res.json())
            .then(data => setCategories(data[0] || []))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/ideas/postIdea", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    content,
                    category_id: categoryId,
                    user_id: 1,
                }),
            });

            if (!response.ok) {
                throw new Error("Impossible de publier votre idée");
            }

            setSuccess("Idée ajoutée avec succès !");
            setError(null);
            setTitle("");
            setContent("");
            setCategoryId(1);
            setShowForm(false);

            // Appeler la fonction passée en prop pour rafraîchir la liste
            onNewIdea();
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <div className="text-center m-5">
            <button
                onClick={() => setShowForm(!showForm)}
                className="btn btn-link p-0"
                aria-label="Ajouter une idée"
                style={{ cursor: "pointer" }}
            >
                <img src="/signe-plus.png" alt="" style={{ width: "2rem" }} />
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="mt-3">
                    <div>
                        <input
                            type="text"
                            placeholder="Titre"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-control mb-2"
                        />
                        <textarea
                            placeholder="Contenu"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="form-control mb-2"
                        />
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(parseInt(e.target.value))}
                            className="form-control mb-2"
                            required
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn btn-primary">
                            Publier l'idée
                        </button>
                    </div>
                    {error && <p className="text-danger mt-2">{error}</p>}
                    {success && <p className="text-success mt-2">{success}</p>}
                </form>
            )}
        </div>
    );
};

export default InputIdea;
