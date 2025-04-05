import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SampleContext from './contexts/SampleContext';

const ImageDisplay = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const {URL}=useContext(SampleContext);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(URL+"/api/bca2025/users");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">BCA 2025 Profiles</h2>

      {loading ? (
        <p className="text-center text-yellow-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-purple-500/30 transition duration-300"
            >
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                <a
                  href={user.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {user.name}
                </a>
              </h3>
              <p className="text-sm text-gray-400">Uploaded: {new Date(user.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
