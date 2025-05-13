import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ itineraryId }) => {
    const { isAuthenticated, user, loading: authLoading } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    // Submit comment
    const handleSubmitComment = async (e) => {
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

        try {
            console.log('Submitting comment with itineraryId:', itineraryId);
            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    itineraryId,
                    text: newComment,
                    parentCommentId: replyingTo ? replyingTo.id : null
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

            if (replyingTo) {
                const updatedComments = comments.map(comment => {
                    if (comment.id === replyingTo.id) {
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), data]
                        };
                    }
                    return comment;
                });
                setComments(updatedComments);
            } else {
                setComments([data, ...comments]);
            }

            setNewComment('');
            setReplyingTo(null);
        } catch (error) {
            console.error('Error submitting comment:', error);
            setError('Failed to post comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Render a comment or reply
    const renderComment = (comment, isReply = false) => (
        <div key={comment.id} className={`comment ${isReply ? 'reply' : ''}`}>
            <div className="comment-header">
                <span className="comment-author">{comment.userName || 'Unknown User'}</span>
                <span className="comment-date">
                    {new Date(comment.created_at).toLocaleString()}
                </span>
            </div>
            <div className="comment-body">{comment.text}</div>
            {!isReply && (
                <button
                    onClick={() => setReplyingTo(comment)}
                    className="reply-button"
                >
                    Reply
                </button>
            )}
        </div>
    );

    return (
        <div className="comment-section">
            <h3>Comments</h3>

            {error && (
                <div className="error-message">
                    {error}
                    {error === 'Please log in to post comments' || error === 'Authentication required. Please log in.' ? (
                        <button onClick={() => window.location.href = "/login"} className="login-button">
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
                {replyingTo && (
                    <div className="reply-to-info">
                        Replying to {replyingTo.userName}
                        <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="cancel-reply"
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={
                        replyingTo && replyingTo.userName
                            ? `Reply to ${replyingTo.userName}`
                            : 'Write a comment...'
                    }
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : replyingTo ? 'Reply' : 'Post Comment'}
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