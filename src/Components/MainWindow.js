
import React, { useState } from 'react';
import './MainWindow.css';


import jsonData from './Data.json';

const App = () => {

    const [productRequests, setProductRequests] = useState(jsonData.productRequests);
    const [newRequest, setNewRequest] = useState({ title: '', description: '', category: '', newComment: '' });
    const [editingRequestId, setEditingRequestId] = useState(null);
    const [sortOption, setSortOption] = useState(null);
    const [filterCategory, setFilterCategory] = useState(null);

    const validateForm = () => {
        if (!newRequest.title.trim() || !newRequest.description.trim() || !newRequest.category.trim()) {
            alert('Please fill in title, description, and category.');
            return false;
        }
        return true;
    };

    const handleCreateRequest = () => {
        if (validateForm()) {
            setProductRequests([...productRequests, { ...newRequest, id: Date.now(), comments: [], upvotes: 0 }]);
            setNewRequest({ title: '', description: '', category: '', newComment: '' });
        }
    };

    const handleEditRequest = (id) => {
        const requestToEdit = productRequests.find((request) => request.id === id);
        setEditingRequestId(id);
        setNewRequest({ ...requestToEdit });
    };

    const handleUpdateRequest = () => {
        if (validateForm()) {
            setProductRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === editingRequestId ? { ...newRequest, id: editingRequestId } : request
                )
            );
            setEditingRequestId(null);
            setNewRequest({ title: '', description: '', category: '', newComment: '' });
        }
    };

    const handleDeleteRequest = (id) => {
        setProductRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
    };

    const handleSort = (option) => {
        setSortOption(option);
    };

    const handleFilterCategory = (category) => {
        setFilterCategory(category);
    };

    const handleAddComment = (id, comment) => {
        setProductRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id
                    ? {
                        ...request,
                        comments: [...(request.comments || []), { id: Date.now(), content: comment, user: 'SampleUser' }],
                    }
                    : request
            )
        );
    };

    const handleUpvote = (id) => {
        setProductRequests((prevRequests) =>
            prevRequests.map((request) => (request.id === id ? { ...request, upvotes: request.upvotes + 1 } : request))
        );
    };


    const sortedAndFilteredProductRequests = () => {
        let filteredRequests = productRequests;

        if (filterCategory) {
            filteredRequests = filteredRequests.filter((request) => request.category === filterCategory);
        }

        switch (sortOption) {
            case 'mostUpvotes':
                return [...filteredRequests].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
            case 'leastUpvotes':
                return [...filteredRequests].sort((a, b) => (a.upvotes || 0) - (b.upvotes || 0));
            case 'mostComments':
                return [...filteredRequests].sort((a, b) => (b.comments ? b.comments.length : 0) - (a.comments ? a.comments.length : 0));
            case 'leastComments':
                return [...filteredRequests].sort((a, b) => (a.comments ? a.comments.length : 0) - (b.comments ? b.comments.length : 0));
            default:
                return filteredRequests;
        }
    };


    return (
        <div className="app">

            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newRequest.category}
                    onChange={(e) => setNewRequest({ ...newRequest, category: e.target.value })}
                />
                {editingRequestId ? (
                    <button onClick={handleUpdateRequest}>Update Request</button>
                ) : (
                    <button onClick={handleCreateRequest}>Create Request</button>
                )}
            </div>


            <div className="options">

                <div className="sort-buttons">
                    <button onClick={() => handleSort('mostUpvotes')}>Most Upvotes</button>
                    <button onClick={() => handleSort('leastUpvotes')}>Least Upvotes</button>
                    <button onClick={() => handleSort('mostComments')}>Most Comments</button>
                    <button onClick={() => handleSort('leastComments')}>Least Comments</button>
                </div>


                <div className="filter-dropdown">
                    <label>Filter by Category:</label>
                    <select onChange={(e) => handleFilterCategory(e.target.value)}>
                        <option value="">All</option>

                        {[...new Set(productRequests.map((request) => request.category))].map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {sortedAndFilteredProductRequests().map((request) => (
                <div key={request.id}>
                    <h2>{request.title}</h2>
                    <p>{request.description}</p>
                    <p>Category: {request.category}</p>


                    <button onClick={() => handleUpvote(request.id)}>Upvote</button>
                    <span>{request.upvotes}</span>


                    <div>
                        <strong>Comments:</strong>
                        {request.comments ? (
                            request.comments.map((comment) => (
                                <div key={comment.id}>
                                    <p>{comment.content}</p>
                                    <p>
                                        By: {comment.user.name}
                                        <img src={process.env.PUBLIC_URL + comment.user.image} alt="User Avatar" />
                                    </p>


                                    {comment.replies ? (
                                        comment.replies.map((reply) => (
                                            <div key={reply.id}>
                                                <p>{reply.content}</p>
                                                <p>
                                                    By: {reply.user.name}
                                                    <img src={process.env.PUBLIC_URL + reply.user.image} alt="User Avatar" />
                                                </p>
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            ))
                        ) : (
                            <p>No comments</p>
                        )}
                    </div>


                    <button onClick={() => handleEditRequest(request.id)}>Edit</button>
                    <button onClick={() => handleDeleteRequest(request.id)}>Delete</button>


                    <input
                        type="text"
                        placeholder="Add Comment"
                        value={newRequest.newComment}
                        onChange={(e) => setNewRequest({ ...newRequest, newComment: e.target.value })}
                    />
                    <button onClick={() => handleAddComment(request.id, newRequest.newComment)}>Add Comment</button>
                </div>
            ))}
        </div>
    );
};

export default App;