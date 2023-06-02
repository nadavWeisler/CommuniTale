import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            'up to 5 books per month',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Private Usage',
        subheader: 'Most popular',
        price: '30',
        description: [
            'up to 100 books per month',
        ],
        buttonText: 'Buy now',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: 'custom',
        description: [
            'Relevant for organizations',
            'Customized according to the the organization needs'
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];

export default function Pricing() {
    return (
        <>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    <i><strong>Pricing</strong></i>
                </Typography>
            </Container>

            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Private Usage' ? 12 : 6}
                            md={4} //
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'private Usage' ? null : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                        {tier.title !== 'Enterprise' ? '$'+tier.price : tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                        {tier.title !== 'Enterprise' ? '/mo' : ''}
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant as 'outlined' | 'contained'}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}