import React, { useState } from 'react';
import './css/voirArticles.css';

const VoirArticles = () => {
    const [author_id, setauthorId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const requestVoirArticle = async (event) => {
        event.preventDefault();
        if (!author_id) {
            console.log("Bad parameter")
            setErrorMessage("Veuillez remplir tous les champs.")
        } else {
            console.log("Success -> voici l'id", author_id)
            setErrorMessage('');
        }
    }
  return (
    <div className="container">
      <header className="container-header">
        <h1>Voir mes articles</h1>
        <form onSubmit={requestVoirArticle} method='POST'>
            <label>
                Votre author ID<br />
                <input type="text" name="name" value={author_id} onChange={(e) => setauthorId(e.target.value)}/>
            </label>
            <br />
            <input className='submit-button' type="submit" value="Voir mes articles" />
        </form>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </header>
    </div>
  );
};

export default VoirArticles;
