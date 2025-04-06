import { useState, useEffect, useContext } from 'react';
import './styles/DisplayCL.css';
import SampleContext from './contexts/SampleContext';

const DisplayCL = () => {
  const [classMembers, setClassMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {URL}=useContext(SampleContext);

  useEffect(() => {
    const fetchClassMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(URL+'/api/bca2025/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch class members');
        }
        
        const data = await response.json();
        const reveredData=data.reverse();
        setClassMembers(reveredData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching class members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassMembers();
  }, []);

  if (loading) {
    return (
      <div className="squid_game_loader">
        <div className="squid_game_shapes">
          <div className="squid_game_circle"></div>
          <div className="squid_game_triangle"></div>
          <div className="squid_game_square"></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="squid_game_error">
        <div className="squid_game_mask">
          <div className="squid_game_mask_inner"></div>
        </div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className="squid_game_retry_btn">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="squid_game_container">
      <div className="squid_game_title_container">
        <h1 className="squid_game_title">BCA 2025</h1>
        <p className="squid_game_subtitle">Memories Forever</p>
      </div>
      
      <div className="squid_game_grid">
        {classMembers.map((member, index) => (
          <div
            key={member._id}
            className="squid_game_player_card"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="squid_game_player_number">{index + 1}</div>
            <div className="squid_game_image_container">
              <img 
                src={member.imageUrl} 
                alt={member.name}
                className="squid_game_player_image" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
            </div>
            <div className="squid_game_player_info">
              <h3 className="squid_game_player_name">{member.name}</h3>
              <a 
                href={member.profileLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="squid_game_instagram_link"
              >
                <span className="squid_game_instagram_icon">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg> */}
                </span>
                CONNECT
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCL;