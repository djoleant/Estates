import React, { useState, useEffect } from "react";
import {
    Paper,
    CssBaseline,
    Box,
    Divider,
    Grid,
    Container,
    Button,
    Typography,
    Slider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import LandlordCard from "./components/Landlord/LandlordCard";

export default function Landlords(props) {

    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:5100/api/Landlord/GetAllLandlords");
        if (response.ok) {
            const d = await response.json();
            setData(d);
        }
    }

    const calculateAvgRating = (info) => {
        let initSum = 0;
        let averageRating;
        info.reviews.forEach((review) => {
          initSum = initSum + review.rating;
        });
        averageRating = Math.round(initSum*100 / parseFloat(info.reviews.length))/100;
        return averageRating
      };


    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <React.Fragment>
                <Grid container xs={12} spacing={3} sx={{ pt: 3 }}>



                    {
                        data.map(l => (
                            <Grid item xs={12} key={l.id}>

                                <LandlordCard
                                    id={l.id}
l                                    name={l.name}
                                    contact={l.contact}
                                    score={calculateAvgRating(l)}
                                    numOfProperties={l.propertyIds.length}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </React.Fragment>
        </Container>
    );
}
