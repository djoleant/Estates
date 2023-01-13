import { Button, Card, Divider, Typography, Grid, Checkbox, CardMedia, Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PropertyCard({
    name, photo, description, address, area, price
}) {

    const navigate = useNavigate();
    //{/* backgroundColor: "#FEBB0277", border: "none" }}>*/}
    return (
        <Card variant="outlined" sx={{ display: "flex" }}>
            <CardMedia
                component="img"
                sx={{ height: 151, maxWidth: "35%" }}
                image={photo}
                alt="Live from space album cover"
            />

            <Grid container spacing={3} sx={{ p: 2 }} >

                <Grid item xs={9}>
                    <Typography
                        align="left"
                        variant="h5"
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            color: "#0071C2",
                            fontWeight: "bold"
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        align="left"
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}

                    >
                        <LocationOnIcon sx={{ color: "#FEBB02" }} />
                        {address}
                    </Typography>
                    <Typography
                        align="left"
                        variant="body2"
                        sx={{ p: 1 }}
                    >
                        {description}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{ display: "flex", gap: 0, flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                        <Typography
                            align="left"
                            variant="h5"
                            sx={{ display: "flex", alignItems: "center" }}


                        >
                            <SquareFootIcon sx={{ color: "#FEBB02" }} fontSize="large" />
                            {area}
                        </Typography>
                        <Typography
                            align="left"
                            variant="h4"
                            sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
                            color="error"
                        >
                            <AttachMoneyIcon color="error" fontSize="large" />
                            {price}
                        </Typography>

                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}