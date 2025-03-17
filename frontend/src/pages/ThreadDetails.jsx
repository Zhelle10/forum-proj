import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteThread, updateThread, likeThread, getThread } from "../api/api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import EmptyState from "../components/EmptyState";
import {
    Container, Typography, Paper, Box, Button, TextField,
    Divider, CircularProgress, Alert, IconButton
} from "@mui/material";
import { ThumbUp, Edit, Delete } from "@mui/icons-material";

const ThreadDetails = () => {
    const { threadId } = useParams();
    const navigate = useNavigate();
    const [thread, setThread] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);  // Loading state


    useEffect(() => {
        const fetchThread = async () => {
            try {
                const data = await getThread(threadId);
                if (!data) {
                    setError("Thread not found");
                    return;
                }
                setThread(data);
                setLikes(data.likes || 0);
                // Initialize edit form with current data
                setEditedTitle(data.title);
                setEditedContent(data.content);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);  // End loading after fetch is complete
            }
        };

        fetchThread();
    }, [threadId]);

    if (loading) {
        return <CircularProgress />;  // Show loading spinner while fetching the thread
    }

    if (error || !thread) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <EmptyState
                    title="Thread Not Found"
                    description="This thread might have been deleted or never existed. Feel free to start a new discussion!"
                />
            </Container>
        );
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this thread?")) {
            try {
                await deleteThread(threadId);
                navigate("/");
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = () => {
        setEditedTitle(thread.title);
        setEditedContent(thread.content);
        setIsEditing(true);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault(); // Add this to prevent form submission
        try {
            if (!editedTitle.trim() || !editedContent.trim()) {
                setError("Title and content are required");
                return;
            }

            const updatedThread = await updateThread(threadId, {
                title: editedTitle,
                content: editedContent,
                username: thread.username
            });

            setThread(updatedThread);
            setIsEditing(false);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLike = async () => {
        try {
            const response = await likeThread(threadId);
            setLikes(response.likes);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error || !thread) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <EmptyState
                    title="Thread Not Found"
                    description="This thread might have been deleted or never existed. Feel free to start a new discussion!"
                />
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Paper sx={{ mt: 4, p: 4 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {isEditing ? (
                    <Box component="form" onSubmit={handleSaveEdit}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            margin="normal"
                            required
                            error={!editedTitle.trim()}
                        />
                        <TextField
                            fullWidth
                            label="Content"
                            multiline
                            rows={4}
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            margin="normal"
                            required
                            error={!editedContent.trim()}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mr: 1 }}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedTitle(thread.title);
                                    setEditedContent(thread.content);
                                    setError(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                {thread.title}
                            </Typography>
                            <Box>
                                <IconButton onClick={handleLike} color="primary">
                                    <ThumbUp /> {likes}
                                </IconButton>
                                <IconButton onClick={handleEdit} color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={handleDelete} color="error">
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Posted by {thread.username}
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="body1" paragraph>
                            {thread.content}
                        </Typography>
                    </>
                )}
            </Paper>
            <Box sx={{ mt: 4 }}>
                <CommentForm threadId={threadId} />
                <CommentList threadId={threadId} />
            </Box>
        </Container>
    );
};

export default ThreadDetails;
