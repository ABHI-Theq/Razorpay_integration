import { Card as MuiCard, CardMedia, CardContent, Button, Typography, Stack } from '@mui/material';
import React from 'react';

const Card = ({ amount, img, checkoutHandler }) => {
    return (
        <MuiCard sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={img}
                alt="product"
            />
            <CardContent>
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Typography variant="h6">
                        ₹{amount}
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => checkoutHandler(amount)}
                    >
                        Buy Now
                    </Button>
                </Stack>
            </CardContent>
        </MuiCard>
    );
};

export default Card;
