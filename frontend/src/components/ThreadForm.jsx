import { useState } from "react";
import { createThread } from "../api/api";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ThreadForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content && username) {
            try {
                const newThread = await createThread({ title, content, username });
                console.log(newThread); // Log to see if thread is created successfully
                window.location.reload(); // Optionally reload page or redirect
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Create New Thread
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        multiline
                        rows={4}
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
                        endIcon={<SendIcon />}
                        sx={{ mt: 2 }}
                    >
                        Create Thread
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

export default ThreadForm;
