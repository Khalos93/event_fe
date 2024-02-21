import axios from 'axios';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import formatDate from '../utils/formatDate';
import { Link } from 'react-router-dom';

function Events() {
  const { auth } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8585/events', {
        headers: { Authorization: auth.token }
      })
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  });

  return (
    <div>
      <h1 className="event__title">Events</h1>

      {events.map(event => {
        const dateTime = formatDate(event.dateTime);

        return (
          <Link key={event.id} to={`/events/${event.id}`}>
            <article className="event__article">
              <h2 className="article__name">{event.name}</h2>
              <p className="article__description">{event.description}</p>
              <p className="article__location">{event.location}</p>
              <p className="article__date">{dateTime}</p>
            </article>
          </Link>
        );
      })}
      <Link to={`/create-event`}>Post new Event</Link>
    </div>
  );
}

export default Events;
