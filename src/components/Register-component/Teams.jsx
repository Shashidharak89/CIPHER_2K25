import { useState, useEffect, useContext } from 'react';
import './styles/Teams.css';
import SampleContext from '../contexts/SampleContext';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [error, setError] = useState(null);
  const [animatingId, setAnimatingId] = useState(null);


  const {URL}=useContext(SampleContext);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(URL+'/api/team/getusers');
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const toggleTeamExpand = (teamId) => {
    if (animatingId) return; // Prevent clicking during animation
    
    setAnimatingId(teamId);
    setTimeout(() => setAnimatingId(null), 600); // Match animation duration
    
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  if (loading) {
    return (
      <div className="sg-loading-container">
        <div className="sg-logo">
          <div className="sg-shapes">
            <div className="sg-triangle"></div>
            <div className="sg-circle"></div>
            <div className="sg-square"></div>
          </div>
        </div>
        <p className="sg-loading-text">LOADING TEAMS...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sg-error">
        <div className="sg-error-icon">!</div>
        <h3 className="sg-error-title">GAME ERROR</h3>
        <p className="sg-error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="sg-teams-container">
      <div className="sg-header">
        <div className="sg-logo-small">
          <div className="sg-triangle-small"></div>
          <div className="sg-circle-small"></div>
          <div className="sg-square-small"></div>
        </div>
        <h1 className="sg-title">PLAYER TEAMS</h1>
      </div>
      
      <div className="sg-teams-list">
        {teams.map((team) => (
          <div 
            key={team._id} 
            className={`sg-team-card ${expandedTeamId === team._id ? 'sg-expanded' : ''} ${animatingId === team._id ? 'sg-animating' : ''}`}
          >
            <div 
              className="sg-team-header"
              onClick={() => toggleTeamExpand(team._id)}
            >
              <div className="sg-team-number">#{team._id.slice(-3)}</div>
              <h2 className="sg-team-name">{team.teamName}</h2>
              <div className="sg-team-stats">
                <span className="sg-team-member-count">{team.numMembers} PLAYERS</span>
              </div>
              <div className="sg-team-badge">
                {expandedTeamId === team._id ? (
                  <span className="sg-badge-icon">▼</span>
                ) : (
                  <span className="sg-badge-icon">▲</span>
                )}
              </div>
            </div>
            
            <div className="sg-team-details">
              <div className="sg-team-info">
                <div className="sg-info-row">
                  <div className="sg-info-label">LEADER</div>
                  <div className="sg-info-value">{team.leaderName}</div>
                </div>
                <div className="sg-separator">
                  <div className="sg-separator-line"></div>
                  <div className="sg-separator-circle"></div>
                  <div className="sg-separator-line"></div>
                </div>
              </div>
              
              <h3 className="sg-members-title">TEAM ROSTER</h3>
              
              <div className="sg-members-wrapper">
                <div className="sg-members-grid">
                  {team.members.map((member, index) => (
                    <div 
                      key={member._id} 
                      className="sg-member-card"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="sg-member-photo-wrapper">
                        <div className="sg-photo-frame">
                          <img 
                            src={member.photoUrl} 
                            alt={`${member.name}`} 
                            className="sg-member-photo" 
                          />
                        </div>
                        <div className="sg-player-number">
                          <span>{member._id.slice(-3)}</span>
                        </div>
                      </div>
                      <div className="sg-member-info">
                        <p className="sg-member-name">{member.name}</p>
                        <div className="sg-member-status">ACTIVE</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="sg-footer">
        <div className="sg-footer-decoration">
          <span className="sg-footer-diamond"></span>
          <span className="sg-footer-line"></span>
          <span className="sg-footer-diamond"></span>
        </div>
        <p className="sg-footer-text">TOTAL TEAMS: {teams.length}</p>
      </div>
    </div>
  );
};

export default Teams;