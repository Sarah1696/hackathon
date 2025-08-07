import { useEffect, useState } from "react";

const FormIdeas = ({ ideas }) => {
  const [userVotes, setUserVotes] = useState({});
  const user_id = 1; // à adapter selon utilisateur connecté

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const voteStates = await Promise.all(
          ideas.map((idea) =>
            fetch(`http://localhost:3000/api/votes/check/${user_id}/${idea.id}`)
              .then((res) => res.json())
              .then((result) => ({ id: idea.id, hasVoted: result.hasVoted }))
          )
        );

        const votesMap = {};
        voteStates.forEach((vote) => {
          votesMap[vote.id] = vote.hasVoted;
        });

        setUserVotes(votesMap);
      } catch (err) {
        console.error("Erreur chargement votes:", err);
      }
    };

    if (ideas.length > 0) {
      fetchVotes();
    }
  }, [ideas, user_id]);

  const toggleVote = async (ideaId) => {
    const hasVoted = userVotes[ideaId];

    try {
      const response = await fetch("http://localhost:3000/api/votes", {
        method: hasVoted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          idea_id: ideaId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUserVotes((prev) => ({
          ...prev,
          [ideaId]: !hasVoted,
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur lors du vote :", error);
    }
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {ideas.map((idea) => (
        <div key={idea.id} className="idea-postit col-3">
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
              marginTop: "0.5rem",
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
