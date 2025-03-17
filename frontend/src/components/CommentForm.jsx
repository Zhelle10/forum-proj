import { useState } from "react";
import { createComment } from "../api/api";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

const CommentForm = ({ threadId }) => {
    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content && username) {
            try {
                const newComment = await createComment({ thread_id: threadId, content, username });
                setContent(""); // Clear form after submission
                setUsername(""); // Clear username field
            } catch (err) {
                console.log("err:", err)
                setError(err.message);
            }
        }
    };

    return (
        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Add a Comment
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                    <TextField
                        fullWidth
                        label="Your comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        multiline
                        rows={3}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        endIcon={<CommentIcon />}
                        sx={{ mt: 2 }}
                    >
                        Post Comment
                    </Button>
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            Error: {error}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default CommentForm;
