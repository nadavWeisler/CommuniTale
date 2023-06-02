import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import IdCard from "./IdCard";

const cards = [1, 2, 3, 4, 5, 6];

export function About() {
    return (
        <React.Fragment>
                <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <Container>
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                About us
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            In a realm of boundless imagination, a group of passionate programmers united for a thrilling 24-hour challenge. <b>Their mission:</b> to harness the power of generative AI and create captivating books for children. With relentless determination, they coded non-stop, delving into the depths of algorithms and creativity. As the sun rose, their efforts bore fruit—an extraordinary collection of AI-crafted books, brimming with wonder and wisdom. These literary treasures would ignite the imaginations of young readers worldwide, leaving a legacy of innovation and inspiring a love for storytelling that transcended time. Their journey showcased the incredible possibilities when passion, collaboration, and coding converged in a realm where dreams come to life.
                            <br></br><br></br>(chatGPT 2023)
                            </Typography>
                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                            </Stack>
                        </Container>
                    </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
            <Grid container spacing={7} direction="row">
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title="Shlomi Shitrit" 
                                description=""
                                    picUrl="https://media.licdn.com/dms/image/D4D03AQE83MgwP_5ceA/profile-displayphoto-shrink_800_800/0/1685658875158?e=1691020800&v=beta&t=t1WlalIGUh2SOh5_bf27JRCXsOpa7wmnDqZ7mDblFkY"  />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title="Anat Flashner"
                                description=""
                                    picUrl="https://media.licdn.com/dms/image/C4E03AQHOLTGorgL_Qg/profile-displayphoto-shrink_800_800/0/1661624030741?e=1691020800&v=beta&t=rOR8cUDlxt06KayxRoEMiLGZrrxbGVeRVpDwRn0c9gc"/>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title="Yotam Feitelson"
                                description=""
                                    picUrl="https://media.licdn.com/dms/image/D4D03AQGYUa24DQCFVw/profile-displayphoto-shrink_800_800/0/1672142775337?e=1691020800&v=beta&t=guba7wqstT6TGUXh7PbUAXN758KxC0WamFbaPYXs5DM"/>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title="Nadav Porat"
                                description=""
                                    picUrl="https://media.licdn.com/dms/image/C4D03AQEuJZ1UkM-Emw/profile-displayphoto-shrink_800_800/0/1572158793894?e=1691020800&v=beta&t=VxoiicdGYOeMRaJDleF7HwZupTTw0ZPdCmdBGtkC17Q"/>
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title="Nadav Weisler"
                                description=""
                                    picUrl="https://media.licdn.com/dms/image/C4D03AQE_P3IHLL6trQ/profile-displayphoto-shrink_800_800/0/1615991285399?e=1691020800&v=beta&t=kNKmENVhU6_4mnpADllUk0QBcD0gx69iYCjnJrgCjq4" />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title="Nitzan Rosen" 
                                description=""
                                    picUrl="https://media.licdn.com/dms/image/C5603AQH4PYEY5LNFRg/profile-displayphoto-shrink_800_800/0/1603109815978?e=1691020800&v=beta&t=_zeduVSkh4Gr3JizGLnX12J8cxS5OErIr67-1SXHOWo"/>
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>
    );
}
