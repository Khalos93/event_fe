import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import formatDate from '../utils/formatDate';

function SingleEvent() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [event, setEvent] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8585/events/${id}`, {
        headers: { Authorization: auth.token }
      })
      .then(res => {
        setEvent(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  });

  if (!event) {
    return <>Loading</>;
  } else {
    const dateTime = formatDate(event.dateTime);
    return (
      <div>
        <h1>Event Detail</h1>
        <article>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{dateTime}</p>
        </article>
        <Link to={`/edit-event/${id}`}>Edit this event</Link>
      </div>
    );
  }
}

export default SingleEvent;
