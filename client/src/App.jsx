import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [activityType, setActivityType] = useState('education');
  const [participants, setParticipants] = useState('1');
  const [activities, setActivities] = useState([]);
  const [errors, setError] = useState("");


  const handleFetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/filter?type=${activityType}&participants=${participants}`);
      setActivities(response.data);
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      setError("New Error");
    }
  };

  return (
    <>

    <div className='box'>
      <h1 className='title'>Hold Up</h1>
      <h3 className='title'>Just go with it ! </h3>
      <div className="sBox">

      <label className='activity'>
      <p className='head'>Activity :</p>
        <select className='option' value={activityType} onChange={(e) => setActivityType(e.target.value)}>
          <option  className="opt" value="education">Education</option>
          <option  className="opt" value="recreational">Recreational</option>
          <option  className="opt" value="social">Social</option>
          <option  className="opt" value="charity">Charity</option>
          <option  className="opt" value="cooking">Cooking</option>
          <option  className="opt" value="relaxation">Relaxation</option>
          <option  className="opt" value="busywork">Busywork</option>
        </select>
      </label>
      <br />
      <label className='member'>
        <p className='head'>Members:</p> 
        <select className='option' value={participants} onChange={(e) => setParticipants(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 8].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      </div>
      <br />
      <button className='submit' onClick={handleFetchData}>Submit</button>
      <br />
      <h2>Here you go :</h2>
      <ul>
      <div>{errors != "" && "Your Limit exceeded, Please try after some time"}</div>
        {activities.map((activity) => (
          <li key={activity.key}>{activity.activity}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;
