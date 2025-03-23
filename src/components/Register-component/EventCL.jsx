import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/EventCL.css';
import SampleContext from '../contexts/SampleContext';

const EventCL = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [error, setError] = useState(null);

  const {URL}=useContext(SampleContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL+'/api/eventlatest/events');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        setLoading(false);
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const toggleEventExpand = (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  if (loading) {
    return (
      <div className="squid_game_loader">
        <div className="squid_game_loader_circle"></div>
        <div className="squid_game_loader_triangle"></div>
        <div className="squid_game_loader_square"></div>
      </div>
    );
  }

  if (error) {
    return <div className="squid_game_error">{error}</div>;
  }

  return (
    <div className="squid_game_container">
      <h1 className="squid_game_title">
        <span className="squid_game_title_text"></span>
        <span className="squid_game_title_subtitle">EVENT-DETAILS</span>
      </h1>
      
      <div className="squid_game_events_container">
        {events.map((event) => (
          <div 
            key={event._id} 
            className={`squid_game_event_card ${expandedEvent === event._id ? 'squid_game_event_card_expanded' : ''}`}
            onClick={() => toggleEventExpand(event._id)}
          >
            <div className="squid_game_event_header">
              <div className="squid_game_event_symbol"></div>
              <h2 className="squid_game_event_title">{event.event}</h2>
              <div className="squid_game_event_slots">
                <span className="squid_game_event_slots_filled">{event.participants ? event.participants.length : 0}</span>
                <span className="squid_game_event_slots_separator">/</span>
                <span className="squid_game_event_slots_total">{9}</span>
              </div>
            </div>
            
            <h3 className="squid_game_event_name">{event.eventname}</h3>

            <div className="squid_game_event_details">
              <div className="squid_game_event_progress">
                <div 
                  className="squid_game_event_progress_bar" 
                  style={{ width: `${(event.participants ? event.participants.length : 0) / event.maxparticipants * 100}%` }}
                ></div>
              </div>
              
              {expandedEvent === event._id && (
                <div className="squid_game_participants_container">
                  <h4 className="squid_game_participants_title">PARTICIPANTS</h4>
                  {event.participants && event.participants.length > 0 ? (
                    <div className="squid_game_participants_list">
                      {event.participants.map((team) => (
                        <div key={team._id} className="squid_game_team">
                          <div className="squid_game_team_header">
                            <span className="squid_game_team_name">{team.teamname}</span>
                            <span className="squid_game_team_count">{team.members.length} players</span>
                          </div>
                          <div className="squid_game_team_members">
                            {team.members.map((member) => (
                              <div key={member._id} className="squid_game_team_member">
                                <div className="squid_game_team_member_avatar"></div>
                                <span className="squid_game_team_member_name">{member.membername}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="squid_game_no_participants">No participants yet</div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCL;