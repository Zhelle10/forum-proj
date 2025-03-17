import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EmptyState = ({ title, description }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" mb={3}>
        {description}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Create New Thread
      </Button>
    </Box>
  );
};

export default EmptyState;
