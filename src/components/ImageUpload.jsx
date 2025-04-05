import React, { useContext, useState } from 'react';
import axios from 'axios';
import SampleContext from './contexts/SampleContext';

const ImageUpload = () => {
  const [name, setName] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const {URL}=useContext(SampleContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      setMessage("Name and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profileLink", profileLink);
    formData.append("image", image);

    try {
      const res = await axios.post(URL+"/api/bca2025/upload", formData);
      setMessage("Uploaded successfully!");
      setName('');
      setProfileLink('');
      setImage(null);
    } catch (error) {
      setMessage("Upload failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Upload Profile</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Instagram Link (optional)</label>
          <input
            type="text"
            placeholder="https://instagram.com/yourprofile"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
            value={profileLink}
            onChange={(e) => setProfileLink(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 bg-gray-800 text-white"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors p-2 rounded font-semibold"
        >
          Upload
        </button>

        {message && (
          <p className="mt-4 text-center text-yellow-400">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ImageUpload;
