import React, { useState, useEffect } from 'react';
import './EditEvent.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

function EditEvent() {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/events';

  const [oldEvent, setOldEvent] = useState({});
  const [editEventName, setEditEventName] = useState('');
  const [editEventDesc, setEditEventDesc] = useState('');
  const [editEventLocation, setEditEventLocation] = useState('');
  const [editEventDateTime, setEditEventDateTime] = useState('');
  const [editEvent, setEditEvent] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8585/events/${id}`)
      .then(res => {
        setOldEvent(res.data);
        setEditEvent(true);
      })
      .catch(err => {
        console.error(err);
      });
  });

  const submitHandler = e => {
    e.preventDefault();
    if (
      editEventName &&
      editEventDesc &&
      editEventLocation &&
      editEventDateTime
    ) {
      const dateObject = new Date(editEventDateTime);

      const date_time = dateObject.toISOString();

      const query = {
        name: editEventName,
        description: editEventDesc,
        dateTime: date_time,
        location: editEventLocation
      };

      console.log(query);

      axios
        .put(`http://localhost:8585/events/${id}`, query, {
          headers: {
            Authorization: auth.token
          }
        })
        .then(res => {
          console.log(res);
          navigate(from, { replace: true });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  if (!editEvent) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <h1>Edit the event</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name:</label>
          <input
            onChange={e => {
              setEditEventName(e.target.value);
            }}
            placeholder={oldEvent.name}
            id="name"
            type="text"
          />
          <label htmlFor="description">Description:</label>
          <input
            onChange={e => {
              setEditEventDesc(e.target.value);
            }}
            placeholder={oldEvent.description}
            id="description"
            type="text"
          />
          <label htmlFor="location">Location:</label>
          <input
            onChange={e => {
              setEditEventLocation(e.target.value);
            }}
            placeholder={oldEvent.location}
            id="location"
            type="text"
          />
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            onChange={e => {
              setEditEventDateTime(e.target.value);
            }}
            id="dateTime"
            type="datetime-local"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default EditEvent;
