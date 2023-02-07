import { Button, Card, Divider, Typography, Grid, Checkbox, CardMedia, Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandlordCard({
    id, name, contact, score, numOfProperties
}) {

    const navigate = useNavigate();
    //{/* backgroundColor: "#FEBB0277", border: "none" }}>*/}
    return (
        <Card variant="outlined" sx={{ display: "flex" }}>


            <Grid container spacing={3} sx={{ p: 2 }} >

                <Grid item xs={12}  >
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
                        <Link to={"/Landlord/" + id}>
                            {name}
                        </Link>
                    </Typography>
                    <Typography
                        align="left"
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}

                    >
                        {"📞 Contact: " + contact}
                    </Typography>
                    <Typography
                        align="left"
                        variant="body2"
                        sx={{ p: 1 }}
                    >
                        {"🌟 Total score:" + score}
                    </Typography>
                    <Typography
                        align="left"
                        variant="body2"
                        sx={{ p: 1 }}
                    >
                        {"🏠 Properties: " + numOfProperties}
                    </Typography>
                </Grid>

            </Grid>
        </Card>
    )
}