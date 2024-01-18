import React, { useState } from 'react';
import data from './Data.json';

const Roadmap = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');


  const filteredRoadmapRequests = data.productRequests.filter((request) => {
    if (selectedStatus === 'all') {
      return true; 
    }
    return request.status === selectedStatus;
  });

  const orderedRoadmapRequests = filteredRoadmapRequests.sort((a, b) => b.upvotes - a.upvotes);


  const plannedColumn = orderedRoadmapRequests.filter((request) => request.status === 'planned');
  const inProgressColumn = orderedRoadmapRequests.filter((request) => request.status === 'in-progress');
  const liveColumn = orderedRoadmapRequests.filter((request) => request.status === 'live');

  return (
    <div>
      <h1>Roadmap</h1>
      <div>
        <button onClick={() => setSelectedStatus('all')}>All</button>
        <button onClick={() => setSelectedStatus('planned')}>Planned</button>
        <button onClick={() => setSelectedStatus('in-progress')}>In Progress</button>
        <button onClick={() => setSelectedStatus('live')}>Live</button>
      </div>
      <div>
        <h2>Selected Status: {selectedStatus}</h2>
        {selectedStatus === 'planned' && plannedColumn.length > 0 && (
          <div>
            <h3>Planned</h3>
            {plannedColumn.map((request) => (
              <div key={request.id}>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p>Upvotes: {request.upvotes}</p>
              </div>
            ))}
          </div>
        )}
        {selectedStatus === 'in-progress' && inProgressColumn.length > 0 && (
          <div>
            <h3>In Progress</h3>
            {inProgressColumn.map((request) => (
              <div key={request.id}>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p>Upvotes: {request.upvotes}</p>
              </div>
            ))}
          </div>
        )}
        {selectedStatus === 'live' && liveColumn.length > 0 && (
          <div>
            <h3>Live</h3>
            {liveColumn.map((request) => (
              <div key={request.id}>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p>Upvotes: {request.upvotes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;