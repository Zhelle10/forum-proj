import ThreadList from "../components/ThreadList";
import ThreadForm from "../components/ThreadForm";
import { Container, Typography, Box, Paper } from "@mui/material";

const Home = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Paper elevation={0} sx={{ textAlign: 'center', mb: 6, py: 4, backgroundColor: 'transparent' }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Welcome to the Forum
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        Join the conversation and share your thoughts
                    </Typography>
                </Paper>
                <Box sx={{ maxWidth: 800, mx: "auto" }}>
                    <ThreadForm />
                    <Box sx={{ mt: 4 }}>
                        <ThreadList />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
