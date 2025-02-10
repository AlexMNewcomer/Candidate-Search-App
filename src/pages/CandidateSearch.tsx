import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ id: number; login: string }[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      searchGithub(searchTerm).then(data => setResults(data));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (results.length > 0) {
      searchGithubUser(results[0].login).then(data => setUser(data));
    }
  }, [results]);

  return (
    <div>
      <h1>CandidateSearch</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search GitHub"
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.login}</li>
        ))}
      </ul>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;