import React, { useState, useEffect } from 'react';
import './styles/EventCL2.css';
import axios from 'axios';

const EventCL2 = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [expandedTeam, setExpandedTeam] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/eventlatest/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const toggleEventExpand = (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
      setExpandedTeam(null);
    }
  };

  const toggleTeamExpand = (teamId) => {
    if (expandedTeam === teamId) {
      setExpandedTeam(null);
    } else {
      setExpandedTeam(teamId);
    }
  };

  if (loading) {
    return (
      <div className="squidEventLoader">
        <div className="squidLoaderCircle"></div>
        <div className="squidLoaderText">Loading...</div>
      </div>
    );
  }

  return (
    <div className="squidEventContainer">
      <div className="squidEventHeader">
        <div className="squidEventTitle">SQUID GAME EVENTS</div>
        <div className="squidEventSubtitle">Compete or Die</div>
        <div className="squidEventDecoration">
          <div className="squidSymbol squidSymbolCircle"></div>
          <div className="squidSymbol squidSymbolTriangle"></div>
          <div className="squidSymbol squidSymbolSquare"></div>
        </div>
      </div>

      <div className="squidEventList">
        {events.map((event) => (
          <div 
            key={event._id} 
            className={`squidEventCard ${expandedEvent === event._id ? 'squidEventCardExpanded' : ''}`}
            onClick={() => toggleEventExpand(event._id)}
          >
            <div className="squidEventCardHeader">
              <div className="squidEventCardTitle">{event.event}</div>
              <div className="squidEventCardBadge">{event.eventname}</div>
              <div className="squidEventCardStatus">
                <span className="squidEventCardStatusLabel">Participants:</span> 
                <span className="squidEventCardStatusValue">
                  {event.participants.length}/{event.maxparticipants}
                </span>
              </div>
            </div>

            {expandedEvent === event._id && (
              <div className="squidEventCardContent">
                <div className="squidEventCardSection">
                  <div className="squidEventCardSectionTitle">PARTICIPANTS</div>
                  
                  {event.participants.length === 0 ? (
                    <div className="squidEventNoParticipants">No participants yet</div>
                  ) : (
                    <div className="squidEventParticipantsList">
                      {event.participants.map((team) => (
                        <div key={team._id} className="squidEventTeamItem">
                          <div 
                            className="squidEventTeamHeader"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTeamExpand(team._id);
                            }}
                          >
                            <div className="squidEventTeamName">{team.teamname}</div>
                            <div className={`squidEventTeamExpandIcon ${expandedTeam === team._id ? 'squidEventTeamExpandIconActive' : ''}`}>
                              &#9660;
                            </div>
                          </div>
                          
                          {expandedTeam === team._id && (
                            <div className="squidEventTeamMembers">
                              {team.members.map((member) => (
                                <div key={member._id} className="squidEventTeamMember">
                                  <div className="squidEventTeamMemberIcon"></div>
                                  <div className="squidEventTeamMemberName">{member.membername}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="squidEventCardFooter">
                  <div className="squidEventCardInfo">
                    <span className="squidEventCardInfoLabel">Max Team Size:</span> 
                    <span className="squidEventCardInfoValue">{event.maxentry}</span>
                  </div>
                  <div className="squidEventCardButton">JOIN GAME</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCL2;