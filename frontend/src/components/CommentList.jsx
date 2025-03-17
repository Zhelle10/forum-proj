import { useEffect, useState } from "react";
import { getComments, updateComment, deleteComment } from "../api/api"; // Import fetch function
import CommentForm from "./CommentForm";


const CommentList = ({ threadId }) => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [editingComment, setEditingComment] = useState(null); // Stores the comment being edited
    const [editText, setEditText] = useState(""); // Stores the updated text

    // Fetch comments when the threadId changes
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getComments(threadId); 
                setComments(commentsData);
            } catch (err) {
                setError(err.message);
            }
        };

        if (threadId) {
            fetchComments();
        }
    }, [threadId]);

    // Handle new comment addition
    const handleNewComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };


    // Function to handle comment deletion
    const handleDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments(comments.filter((comment) => comment.id !== commentId)); // Remove from UI
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to handle comment update
    const handleUpdate = async (commentId) => {
        try {   
            const updatedComment = await updateComment(commentId, editText);
            setComments(comments.map((comment) =>
                comment.id === commentId ? { ...comment, content: updatedComment.content } : comment
            ));
            setEditingComment(null); // Exit edit mode
            setEditText(""); // Clear the edit text
        } catch (err) {
            setError(err.message);
        }
    };


    // Handle change in edit input field
    const handleEditChange = (e) => {
        setEditText(e.target.value);
    };

    // Display the comment edit form or normal view
    const renderComment = (comment) => {
        if (editingComment === comment.id) {
            return (
                <div>
                    <textarea
                        value={editText}
                        onChange={handleEditChange}
                        placeholder="Edit your comment"
                    />
                    <button onClick={() => handleUpdate(comment.id)}>Update</button>
                    <button onClick={() => setEditingComment(null)}>Cancel</button>
                </div>
            );
        } else {
            return (
                <div>
                    <span>{comment.content} - <strong>{comment.username}</strong></span>
                    <button onClick={() => { setEditingComment(comment.id); setEditText(comment.content); }}>Edit</button>
                    <button onClick={() => handleDelete(comment.id)}>Delete</button>
                </div>
            );
        }
    };



    return (
        <div>
            <h3>Comments</h3>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {renderComment(comment)} {/* Display either the normal or edit view */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
