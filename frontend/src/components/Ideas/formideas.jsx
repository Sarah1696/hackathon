import { useEffect, useState } from "react";

const FormIdeas = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userVotes, setUserVotes] = useState({});

    const user_id = 1

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/ideas/getIdeas", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des idées");
                }

                const data = await response.json();
                setIdeas(data);
                setLoading(false);

                // Charger les votes de l'utilisateur pour chaque idée
                const voteStates = await Promise.all(
                    data.map(idea =>
                        fetch(`http://localhost:3000/api/votes/check/${user_id}/${idea.id}`)
                            .then(res => res.json())
                            .then(result => ({ id: idea.id, hasVoted: result.hasVoted }))
                    )
                );

                const votesMap = {};
                voteStates.forEach(vote => {
                    votesMap[vote.id] = vote.hasVoted;
                });

                setUserVotes(votesMap);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleVote = async (ideaId) => {
        const hasVoted = userVotes[ideaId];

        try {
            const response = await fetch("http://localhost:3000/api/votes", {
                method: hasVoted ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id,
                    idea_id: ideaId
                })
            });

            const data = await response.json();

            if (data.success) {
                setUserVotes(prev => ({
                    ...prev,
                    [ideaId]: !hasVoted
                }));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Erreur lors du vote :", error);
        }
    };

    if (loading) return <p>Chargement des idées...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {ideas.map(idea => (
                <div key={idea.id} className="idea-postit">
                    <img src="/punaise.png" alt="Punaise" className="idea-pin" />
                    <h4 className="text-center">{idea.title}</h4>
                    <p>{idea.content}</p>
                    <small>
                        <u>Catégorie</u> : {idea.category || "Non spécifiée"} <br />
                        <u>Auteur</u> : {idea.firstname}, {idea.lastname} <br />
                        <u>Créée le</u> : {new Date(idea.created_at).toLocaleDateString()}
                    </small>
                    <br />
                    <button
                        onClick={() => toggleVote(idea.id)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.5rem",
                            marginTop: "0.5rem"
                        }}
                        aria-label="J'aime"
                    >
                        <img
                            src={userVotes[idea.id] ? "/pouces-vers-le-haut (1).png" : "/pouces-vers-le-haut.png"}
                            alt="J'aime"
                            style={{ width: "24px", height: "24px" }}
                        />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FormIdeas;
