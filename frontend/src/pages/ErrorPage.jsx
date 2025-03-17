import { useRouteError } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Oops!
                </Typography>
                <Typography color="text.secondary" paragraph>
                    {error.statusText || error.message}
                </Typography>
                <Button component={Link} to="/" variant="contained">
                    Go Back Home
                </Button>
            </Box>
        </Container>
    );
}
