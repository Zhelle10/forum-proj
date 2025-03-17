import { useEffect, useState } from "react";
import { getComments, updateComment, deleteComment } from "../api/api"; // Import fetch function
import CommentForm from "./CommentForm";
import { Button, TextField, List, ListItem, ListItemText, Typography, Box, Card, CardContent } from "@mui/material";


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
            const interval = setInterval(fetchComments, 5000); // Fetch comments every 5 seconds
            return () => clearInterval(interval);
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
        return (
            <Card sx={{ mb: 4, width: "100%" }}>
                <CardContent sx={{ width: "100%" }}>
                    <ListItem
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "10px",
                            marginBottom: "10px",
                            width: "100%",
                        }}
                    >
                        {editingComment === comment.id ? (
                            <Box width="100%">
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    value={editText}
                                    onChange={handleEditChange}
                                    placeholder="Edit your comment"
                                    sx={{ marginBottom: 1 }}
                                />
                                <Button variant="contained" color="primary" onClick={() => handleUpdate(comment.id)} sx={{ marginRight: 1 }}>
                                    Update
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => setEditingComment(null)}>
                                    Cancel
                                </Button>
                            </Box>
                        ) : (
                            <Box width="100%">
                                <ListItemText
                                    primary={<Typography variant="body1">{comment.content}</Typography>}
                                    secondary={<Typography variant="caption">By {comment.username}</Typography>}
                                />
                                <Box sx={{ marginTop: 1 }}>
                                    <Button variant="contained" color="primary" size="small" sx={{ marginRight: 1 }}
                                        onClick={() => { setEditingComment(comment.id); setEditText(comment.content); }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(comment.id)}>
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </ListItem>
                </ CardContent>
            </ Card >
        );
    };

    return (
        <Box sx={{ margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom>
                Comments
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <List>
                {comments.length > 0 ? (
                    comments.map((comment) => <div key={comment.id}>{renderComment(comment)}</div>)
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No comments yet. Be the first to comment!
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default CommentList;
