import { useState, useEffect } from 'react';
// Removed unused imports


interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar_url: string;
  email: string;
  html_url: string;
  company: string;
}

export default function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem("savedCandidates") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  useEffect(() => {
    fetch("https://api.github.com/users?per_page=10")
      .then((response) => response.json())
      .then((data) => {
        const formattedCandidates = data.map((user: { name: string; login: string; location: string; avatar_url: string; email: string; html_url: string; company: string; }) => ({
          name: user.name || "No Name Provided",
          username: user.login,
          location: user.location || "Unknown",
          avatar_url: user.avatar_url,
          email: user.email || "Not Available",
          html_url: user.html_url,
          company: user.company || "No Company",
        }));
        setCandidates(formattedCandidates);
      });
  }, []);

  const handleAccept = () => {
    if (candidates[currentIndex]) {
      setSavedCandidates([...savedCandidates, candidates[currentIndex]]);
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCandidates([]);
    }
  };

  return (
    <div className="p-4">
      {candidates.length > 0 ? (
        <div className="border p-4 rounded shadow-md flex flex-col items-center">
          <img
            src={candidates[currentIndex].avatar_url}
            alt="Avatar"
            className="rounded-full w-24 h-24 mb-4"
          />
          <h2 className="text-xl font-bold">{candidates[currentIndex].name}</h2>
          <p>@{candidates[currentIndex].username}</p>
          <p>{candidates[currentIndex].location}</p>
          <p>{candidates[currentIndex].email}</p>
          <p>
            <a
              href={candidates[currentIndex].html_url}
              target="_blank"
              className="text-blue-500"
            >
              GitHub Profile
            </a>
          </p>
          <p>{candidates[currentIndex].company}</p>
          <div className="mt-4 flex space-x-4">
            <button onClick={handleAccept} className="bg-green-500 text-white p-2 rounded">+</button>
            <button onClick={handleNext} className="bg-red-500 text-white p-2 rounded">-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
}
