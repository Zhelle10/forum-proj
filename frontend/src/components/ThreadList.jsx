import { useEffect, useState } from "react";
import { getThreads, deleteThread } from "../api/api";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Card, CardContent, Typography, Box, Link,
    CircularProgress, Alert, IconButton
} from "@mui/material";
import {
    Comment as CommentIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    ThumbUp as ThumbUpIcon
} from "@mui/icons-material";
import EmptyState from "./EmptyState";

const ThreadList = () => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const threadsData = await getThreads();
                setThreads(threadsData);
            } catch (err) {
                setError(err.message);
            } finally {

                if (threads.length === 0) {
                    setError(null)
                    return (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                No threads yet
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Be the first to start a discussion! Post your thread now.
                            </Typography>
                            <Button
                                component={RouterLink}
                                to="/thread/new"
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Create New Thread
                            </Button>
                        </Box>
                    );
                }
            }
        };
        fetchThreads();
    }, []);

    const handleDelete = async (threadId, e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this thread?")) {
            try {
                await deleteThread(threadId);

                const updatedThreads = threads.filter(thread => thread.id !== threadId);
                setThreads(updatedThreads);
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (threadId, e) => {
        e.preventDefault();
        navigate(`/thread/${threadId}`);
        // The edit mode will be handled within ThreadDetails
    };

    if (error) {
        return <Alert severity="error">Error: {error}</Alert>;
    }

    if (threads.length === 0) {
        return (
            <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
                <EmptyState
                    title="No Threads Yet"
                    description="Be the first to start a discussion! Create a new thread now."
                />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom textAlign="center">
                Forum Threads
            </Typography>
            {threads.length === 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {threads.map((thread) => (
                        <Card key={thread.id} sx={{ '&:hover': { transform: 'translateY(-2px)', transition: '0.3s' } }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            <Link component={RouterLink} to={`/thread/${thread.id}`} underline="hover">
                                                {thread.title}
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Posted by {thread.username} • {new Date(thread.created_at).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <IconButton onClick={(e) => handleEdit(thread.id, e)} size="small" color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={(e) => handleDelete(thread.id, e)} size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    {thread.content.substring(0, 150)}...
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CommentIcon sx={{ mr: 1, fontSize: 'small' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {thread.comment_count || 0} comments
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ThumbUpIcon sx={{ mr: 1, fontSize: 'small' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {thread.likes || 0} likes
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ThreadList;
