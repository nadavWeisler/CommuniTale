import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface HomeProps {
    openCreateBookForm: () => void;
}

function Home({ openCreateBookForm }: HomeProps) {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Welcome to CommuniTale
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Here you can create all sort of custom made stories for helping your childerns
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={openCreateBookForm}>Create custom story</Button>
                </Stack>
            </Container>
        </Box>
    );
}

export default Home;