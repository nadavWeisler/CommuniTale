import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import IdCard from "./IdCard";

const cards = [1, 2, 3, 4, 5, 6];

export function About() {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4} direction="row">
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title={"Shlomi Shitrit"} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title={"Anat Flashner"} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title={"Ar"} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title={"Anat Fr"} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title={"Nadav Weisler"} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                    <IdCard title={"Nadasler"} />
                </Grid>
            </Grid>
        </Container>
    );
}
