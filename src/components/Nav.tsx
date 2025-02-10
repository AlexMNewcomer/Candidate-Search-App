import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">Candidate Search</h1>
      <div className="space-x-4">
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Search Candidates</button>
        </Link>
        <Link to="/saved">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Saved Candidates</button>
        </Link>
      </div>
    </nav>
  );
}
