import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import FormIdeas from "../components/Ideas/formideas";
import InputIdea from "../components/Ideas/inputidea";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/ideas/getIdeas");
      if (!res.ok) throw new Error("Erreur lors du chargement des idées");
      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <>
      <Header />
      <InputIdea onNewIdea={fetchIdeas} />
      <FormIdeas ideas={ideas} />
      <Footer />
    </>
  );
};

export default Ideas;
