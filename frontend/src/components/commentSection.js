import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import './commentSection.css';

const CommentSection = ({ itineraryId }) => {
    const { isAuthenticated, user, loading: authLoading } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(''); // For main comment form
    const [replyingTo, setReplyingTo] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [replyForms, setReplyForms] = useState({}); // Track reply forms for each comment
    const [replyTexts, setReplyTexts] = useState({}); // Track reply text for each comment

    // Backend base URL
    const BASE_URL = 'http://localhost:5000';
    // Default avatar (local asset, place in public/images/)
    const defaultAvatar = '/images/default-avatar.png';
    // Track failed avatar URLs to prevent reload loops
    const failedAvatars = useRef(new Set());

    // Fetch comments
    const fetchComments = async () => {
        if (!itineraryId) {
            setError('No itinerary ID provided');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching comments for itineraryId:', itineraryId);
            const response = await fetch(`http://localhost:5000/api/comments/${itineraryId}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to view comments');
                } else {
                    throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
                }
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Expected JSON response but got ${contentType}`);
            }
            const data = await response.json();
            console.log('Comments data:', data);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError('Failed to load comments. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('itineraryId:', itineraryId);
        if (itineraryId && !authLoading) {
            fetchComments();
        }
    }, [itineraryId, authLoading]);

    // Submit comment or reply
    const handleSubmitComment = async (e, parentCommentId = null, replyText = null) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError('Please log in to post comments');
            return;
        }
        if (!itineraryId) {
            setError('No itinerary ID provided');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        const textToSubmit = parentCommentId ? replyText : newComment; // Use replyText for replies
        try {
            console.log('Submitting comment/reply with itineraryId:', itineraryId);
            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    itineraryId,
                    text: textToSubmit,
                    parentCommentId: parentCommentId || (replyingTo ? replyingTo.id : null)
                })
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication required. Please log in.');
                }
                const errorData = await response.json().catch(() => null);
                const errorMsg = errorData?.error || `Failed with status: ${response.status}`;
                throw new Error(errorMsg);
            }
            const data = await response.json();
            if (parentCommentId || replyingTo) {
                const updatedComments = comments.map(comment => {
                    if (comment.id === (parentCommentId || replyingTo.id)) {
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), data]
                        };
                    }
                    return comment;
                });
                setComments(updatedComments);
                // Clear the reply text for this comment
                setReplyTexts(prev => ({ ...prev, [parentCommentId]: '' }));
            } else {
                setComments([data, ...comments]);
                setNewComment('');
            }
            setReplyingTo(null);
            setReplyForms(prev => ({ ...prev, [parentCommentId || replyingTo?.id]: false }));
        } catch (error) {
            console.error('Error submitting comment/reply:', error);
            setError('Failed to post comment/reply. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Edit comment
    const handleEditComment = async (commentId) => {
        if (!isAuthenticated) {
            setError('Please log in to edit comments');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ text: editText })
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication required. Please log in.');
                }
                if (response.status === 403) {
                    throw new Error('Not authorized to edit this comment');
                }
                const errorData = await response.json().catch(() => null);
                const errorMsg = errorData?.error || `Failed with status: ${response.status}`;
                throw new Error(errorMsg);
            }
            const updatedComment = await response.json();
            console.log('Updated comment:', updatedComment);
            const updateComments = (commentsArray) =>
                commentsArray.map(comment => {
                    if (comment.id === commentId) {
                        return updatedComment;
                    }
                    if (comment.replies) {
                        return { ...comment, replies: updateComments(comment.replies) };
                    }
                    return comment;
                });
            setComments(updateComments(comments));
            setEditingComment(null);
            setEditText('');
        } catch (error) {
            console.error('Error editing comment:', error);
            setError(error.message || 'Failed to edit comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        if (!isAuthenticated) {
            setError('Please log in to delete comments');
            return;
        }
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication required. Please log in.');
                }
                if (response.status === 403) {
                    throw new Error('Not authorized to delete this comment');
                }
                const errorData = await response.json().catch(() => null);
                const errorMsg = errorData?.error || `Failed with status: ${response.status}`;
                throw new Error(errorMsg);
            }
            const updateComments = (commentsArray) =>
                commentsArray.filter(comment => comment.id !== commentId).map(comment => ({
                    ...comment,
                    replies: comment.replies ? updateComments(comment.replies) : []
                }));
            setComments(updateComments(comments));
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError(error.message || 'Failed to delete comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Render a comment or reply
    const renderComment = (comment, isReply = false) => {
        const isEditing = editingComment && editingComment.id === comment.id;
        const isOwnComment = isAuthenticated && user && (comment.userId === user.id || comment.user_id === user.id);
        const avatarSrc = failedAvatars.current.has(comment.avatarUrl) || !comment.avatarUrl
            ? defaultAvatar
            : comment.avatarUrl.startsWith('http')
                ? comment.avatarUrl
                : `${BASE_URL}${comment.avatarUrl}`;
        const isReplying = replyForms[comment.id];
        const currentReplyText = replyTexts[comment.id] || `@${comment.userName || 'Unknown User'} `;

        console.log('Avatar src for comment', comment.id, ':', avatarSrc);

        return (
            <div key={comment.id} className={`comment ${isReply ? 'reply' : ''}`}>
                {isEditing ? (
                    <div className="comment-edit-container">
                        <div className="comment-header">
                            <div className="comment-user">
                                <img
                                    src={avatarSrc}
                                    alt={`${comment.userName || 'User'} avatar`}
                                    className="comment-avatar"
                                    onError={(e) => {
                                        console.log('Image failed to load:', comment.avatarUrl);
                                        failedAvatars.current.add(comment.avatarUrl);
                                        e.target.src = defaultAvatar;
                                    }}
                                />
                                <span className="comment-author">{comment.userName || 'Unknown User'}</span>
                            </div>
                            <span className="comment-date">
                                {new Date(comment.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div className="edit-comment-form">
                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                placeholder="Edit your comment..."
                                required
                                disabled={loading}
                            />
                            <div>
                                <button
                                    onClick={() => handleEditComment(comment.id)}
                                    disabled={loading || !editText.trim()}
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingComment(null);
                                        setEditText('');
                                    }}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="comment-header">
                            <div className="comment-user">
                                <img
                                    src={avatarSrc}
                                    alt={`${comment.userName || 'User'} avatar`}
                                    className="comment-avatar"
                                    onError={(e) => {
                                        console.log('Image failed to load:', comment.avatarUrl);
                                        failedAvatars.current.add(comment.avatarUrl);
                                        e.target.src = defaultAvatar;
                                    }}
                                />
                                <span className="comment-author">{comment.userName || 'Unknown User'}</span>
                            </div>
                            <span className="comment-date">
                                {new Date(comment.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div className="comment-body">{comment.text}</div>
                        {isReplying && (
                            <form
                                onSubmit={(e) => handleSubmitComment(e, comment.id, replyTexts[comment.id])}
                                className="comment-form reply-form"
                            >
                                <textarea
                                    value={currentReplyText}
                                    onChange={(e) => {
                                        const ping = `@${comment.userName || 'Unknown User'} `;
                                        const newText = e.target.value;
                                        if (newText.startsWith(ping)) {
                                            setReplyTexts(prev => ({
                                                ...prev,
                                                [comment.id]: newText
                                            }));
                                        } else {
                                            setReplyTexts(prev => ({
                                                ...prev,
                                                [comment.id]: ping + newText
                                            }));
                                        }
                                    }}
                                    placeholder={`Reply to ${comment.userName || 'Unknown User'}...`}
                                    required
                                    disabled={loading}
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Posting...' : 'Reply'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReplyTexts(prev => ({ ...prev, [comment.id]: '' }));
                                        setReplyForms(prev => ({ ...prev, [comment.id]: false }));
                                    }}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </form>
                        )}
                        <div className="comment-actions">
                            {!isReply && (
                                <button
                                    onClick={() => {
                                        console.log('Setting reply form for:', comment);
                                        const ping = `@${comment.userName || 'Unknown User'} `;
                                        setReplyTexts(prev => ({
                                            ...prev,
                                            [comment.id]: ping
                                        }));
                                        setReplyForms(prev => ({ ...prev, [comment.id]: true }));
                                    }}
                                    className="reply-button"
                                >
                                    Reply
                                </button>
                            )}
                            {isOwnComment && (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditingComment(comment);
                                            setEditText(comment.text);
                                        }}
                                        className="edit-button_c"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="delete-button_c"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>
            {error && (
                <div className="error-message">
                    {error}
                    {error === 'Please log in to post comments' ||
                        error === 'Authentication required. Please log in.' ? (
                        <button
                            onClick={() => (window.location.href = '/login')}
                            className="login-button"
                        >
                            Log In
                        </button>
                    ) : (
                        <button onClick={fetchComments} className="retry-button">
                            Retry
                        </button>
                    )}
                </div>
            )}
            <form onSubmit={handleSubmitComment} className="comment-form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
            <div className="comments-list">
                {loading && !comments.length ? (
                    <div className="loading">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="no-comments">No comments yet. Be the first to comment!</div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-thread">
                            {renderComment(comment)}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="replies-container">
                                    {comment.replies.map(reply => renderComment(reply, true))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;