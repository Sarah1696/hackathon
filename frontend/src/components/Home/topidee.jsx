import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const TopIdee = () => {
    const [topIdeas, setTopIdeas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/ideas/getIdeas")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setTopIdeas(sorted.slice(0, 3));
            })
            .catch(err => console.error(err));
    }, []);

    return(
        <div className="container mt-5 mb-5">
            <h2>Top 3 des idées </h2>
            <ul>
                {topIdeas.map((idea, index) => (
                    <li key={idea.id}>
                        <strong>{idea.title}</strong> - par {idea.firstname} {idea.lastname}
                    </li>
                ))}
            </ul>
            <Link to='/ideas' style={{color:'black'}}>Voir plus</Link>
        </div>

    )
}

export default TopIdee