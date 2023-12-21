import React, { useState } from 'react';
import './App.css';

function App() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author_id, setauthorId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const createArticle = async (event) => {
        event.preventDefault();
        if (!title || !content || !author_id) {
            console.log("Bad parameter")
            setSuccessMessage('')
            setErrorMessage("Veuillez remplir tous les champs.")
        } else {
            try {
                const response = await fetch('http://localhost:5000/articles/create', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      title,
                      content,
                      author_id,
                    }),
                  });

                if (response.ok) {
                    console.log("Article créé avec succès !");
                    setSuccessMessage("Article créé avec succès !")
                    setTitle('');
                    setContent('');
                    setauthorId('');
                    setErrorMessage('');
                } else {
                    const errorData = await response.json();
                    setErrorMessage("Erreur:", errorData.message)
                    setSuccessMessage('')
                  }
            } catch (error) {
                console.error('Erreur lors de la requête API:', error);
                setErrorMessage("Erreur lors de la requête API", error)
                setSuccessMessage('')
            }
        }
        

    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Creer un article</h1>
        <form onSubmit={createArticle} method='POST'>
            <label>
                Titre de l'article<br />
                <input type="text" name="name" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <br />
            <label>
                Contenu de l'article<br />
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </label>
            <br />
            <label>
                Id de l'auteur<br />
                <input value={author_id} onChange={(e) => setauthorId(e.target.value)} type="text" name="name" pattern="[0-9]+" title="Veuillez entrer uniquement des chiffres" />
                <span class="info-icon" title="L'auteur ID permettra de retrouver tout vos articles créer avec cette ID">?</span>
            </label>
            <br />
            <input className='submit-button' type="submit" value="Submit" />
        </form>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </header>
    </div>
  );
}

export default App;
