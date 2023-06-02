import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface IdCardProps {
    picUrl: string;
    title: string;
    description: string;
}

function IdCard(props: IdCardProps) {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardMedia
                component="div"
                sx={{
                    // 16:9
                    pt: "100.00%" //"56.25%",
                }}
                image= {props.picUrl}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default IdCard;
