import React, { useState } from 'react';
import data from './Data.json';
import './SuggestionsPage.css';

const SuggestionsPage = () => {
  const [newRequest, setNewRequest] = useState({
    title: '',
    category: 'enhancement',
    upvotes: 0,
    status: 'suggestion',
    description: '',
    comments: [],
  });

  const [newComments, setNewComments] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({
      ...newRequest,
      [name]: value,
    });
  };

  const handleCommentChange = (requestId, e) => {
    setNewComments({
      ...newComments,
      [requestId]: e.target.value,
    });
  };

  const createProductRequest = () => {
    const highestId = Math.max(...data.productRequests.map((request) => request.id), 0);
    const newRequestId = highestId + 1;
    setNewRequest({
      ...newRequest,
      id: newRequestId,
    });
    data.productRequests.push(newRequest);
  };

  const addComment = (requestId) => {
    const commentId = data.productRequests.find((request) => request.id === requestId)?.comments.length + 1;

    
    const existingComments = data.productRequests.find((request) => request.id === requestId)?.comments || [];

    const newCommentObj = {
      id: commentId,
      content: newComments[requestId],
      user: data.currentUser,
    };


    if (newCommentObj.content.length <= 250) {
      
      data.productRequests.forEach((request) => {
        if (request.id === requestId) {
          request.comments = [...existingComments, newCommentObj];
        }
      });

   
      setNewComments({
        ...newComments,
        [requestId]: '',
      });
    } else {
      alert('Comment cannot exceed 250 characters.');
    }
  };

  const sassSuggestions = data.productRequests.filter(
    (request) => request.category === 'enhancement' && request.status === 'suggestion'
  );

  return (
    <div>
      <h1>Suggestions Page</h1>

    
      <label>Title: </label>
      <input
        type="text"
        name="title"
        value={newRequest.title}
        onChange={handleInputChange}
      />
      <br />
      <label>Description: </label>
      <textarea
        name="description"
        value={newRequest.description}
        onChange={handleInputChange}
      />
      <br />


      <button onClick={createProductRequest}>Create New Product Request</button>

      {sassSuggestions.map((request) => (
        <div key={request.id}>
          <h2>{request.title}</h2>
          <p>{request.description}</p>
          <p>Upvotes: {request.upvotes}</p>

   
          {request.comments && (
            <div>
              <h3>Comments:</h3>
              {request.comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.content}</p>
                  <p>
                    Comment by {comment.user.name} (@{comment.user.username})
                  </p>
                  <img src={comment.user.image} alt={comment.user.name} />
                </div>
              ))}
            </div>
          )}

    
          <textarea
            value={newComments[request.id] || ''}
            onChange={(e) => handleCommentChange(request.id, e)}
            placeholder="Add your comment (max 250 characters)"
          />


          <button onClick={() => addComment(request.id)}>Add Comment</button>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsPage;