import { Box, Typography, Stack } from '@mui/material';
import React from 'react';
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                gap: 2
            }}
        >
            <Typography variant="h4" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                Order Successful
            </Typography>

            <Typography variant="body1">
                Reference No. {referenceNum}
            </Typography>
        </Box>
    );
};

export default PaymentSuccess;
