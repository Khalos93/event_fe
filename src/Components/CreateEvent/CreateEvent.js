import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateEvent() {
  const { auth } = useAuth();
  const nameRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/events';

  const [evName, setEvName] = useState('');
  const [evDescription, setEvDesctription] = useState('');
  const [evLocation, setEvLocation] = useState('');
  const [evDate_time, setEvDate_time] = useState('');

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    if (evName && evDescription && evLocation && evDate_time) {
      const dateObject = new Date(evDate_time);

      const date_time = dateObject.toISOString();

      const query = {
        name: evName,
        description: evDescription,
        location: evLocation,
        dateTime: date_time
      };

      axios
        .post(`http://localhost:8585/events`, query, {
          headers: { Authorization: auth.token }
        })
        .then(res => {
          console.log(res);
          navigate(from, { replace: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label ref={nameRef} htmlFor="name">
        Name:
      </label>
      <input
        onChange={e => {
          setEvName(e.target.value);
        }}
        id="name"
        type="text"
      />
      <label htmlFor="description">Description:</label>
      <input
        onChange={e => {
          setEvDesctription(e.target.value);
        }}
        id="description"
        type="text"
      />
      <label htmlFor="location">Location:</label>
      <input
        onChange={e => {
          setEvLocation(e.target.value);
        }}
        id="location"
        type="text"
      />
      <label htmlFor="dateTime">Date and Time:</label>
      <input
        onChange={e => {
          setEvDate_time(e.target.value);
        }}
        id="dateTime"
        type="datetime-local"
      />
      <button>Submit</button>
    </form>
  );
}

export default CreateEvent;
