import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const title = `Projeto ${Date.now()}`;
    const slug = title.toLowerCase().split(' ').join('-');

    const { data } = await api.post('repositories', {
      title,
      url: `https://github.com/test/${slug}`,
      techs: ['Node.js', 'ReactJS'],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(1)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
