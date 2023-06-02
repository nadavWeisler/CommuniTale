import React , { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface IdCardProps {
    picUrl: string;
    title: string;
    description: string;

}

function IdCard(props: IdCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    const containerStyles: React.CSSProperties = {
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform 0.3s ease',
        /* Add other desired styles for the container */
    };   
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
            style={containerStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
