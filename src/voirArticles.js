import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/voirArticles.css';

const VoirArticles = () => {
    const [author_id, setauthorId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [articles, setArticles] = useState([]);
    const [lenghtArticles, setLenghtArticles] = useState('')

    const resetArticles = () => {
        setArticles([])
        setLenghtArticles(0)
    }

    
    const requestVoirArticle = async (event) => {
        event.preventDefault();
        if (!author_id) {
            console.log("Bad parameter")
            setErrorMessage("Veuillez remplir tous les champs.")
        } else {
            try {
                const response = await fetch(`http://localhost:5000/articles/view/${author_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Statut de la réponse:', response.status);

                if (response.ok) {
                    const responseData = await response.json();
                    const articlesResult = responseData.articles;
                    setArticles(articlesResult)
                    setLenghtArticles(articlesResult.length)
                    setauthorId('')
                    setErrorMessage('')
                } else {
                    console.error('Réponse non OK lors de la requête API:', response.status);
                    setErrorMessage("Réponse non OK lors de la requête API");
                }
            } catch (error) {
                console.error('Erreur lors de la requête API:', error);
                setErrorMessage("Erreur lors de la requête API", error)
            }
        }
    }
    return (
        <div className="container">
            <header className="container-header">
                <h1>Voir mes articles</h1>
                <form onSubmit={requestVoirArticle} method='POST'>
                    <label>
                        Votre author ID<br />
                        <input type="text" name="name" pattern="[0-9]+" title="Veuillez entrer uniquement des chiffres" value={author_id} onChange={(e) => setauthorId(e.target.value)} />
                    </label>
                    <br />
                    <input className='submit-button' type="submit" value="Voir mes articles" />
                </form>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <Link className='teste' to="/">Retourner à l'acceuil</Link>
                <section className="articles-section">
                    {lenghtArticles > 0 ? (
                        <h2>{lenghtArticles} Articles trouvés</h2>
                    ) : (
                        <h2>Aucun article trouvé</h2>
                    )}
                    <ul>
                        {articles.map((article) => (
                            <li key={article.article_id}>
                                <h3>{article.title}</h3>
                                <p>{article.content}</p>
                                <p>Créé le: {new Date(article.create_at).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <button onClick={resetArticles}>Reset</button>
            </header>
        </div>
    );
};

export default VoirArticles;
