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
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import PaperCard from "./components/Search/PaperCard";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PropertyCard from "./components/Filter/PropertyCard";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PetsIcon from '@mui/icons-material/Pets';

export default function FilterProperties(props) {

    const [data, setData] = useState([
        { id: "1", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"], amenities: ["Pool", "Laundry room", "Sauna", "AC"] },
        { id: "2", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
        { id: "3", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
        { id: "4", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
        { id: "5", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
        { id: "6", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
        { id: "7", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] },
        { id: "8", name: "Property Name", description: "This is some example description...", photos: ["https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"] }
    ]);

    const getData = async () => {
        let req = `http://localhost:5100/api/Property/FilterProperties?city=${encodeURIComponent(document.getElementById("city_name").value)}&minArea=${area[0]}&maxArea=${area[1]}&minPrice=${price[0]}&maxPrice=${price[1]}`;
        if (document.getElementById("pet_friendly").checked) {
            req += "&petFriendly=true";
        }
        if (document.getElementById("house").checked && !document.getElementById("apartment").checked) {
            req += "&propertyType=0";
        }
        if (document.getElementById("apartment").checked && !document.getElementById("house").checked) {
            req += "&propertyType=1";
        }
        const resp = await fetch(req);
        if (resp.ok) {
            const estates = await resp.json();
            setData(estates);
            console.log(req, estates);
        }
    }

    const [price, setPrice] = React.useState([0, 999999]);

    const [area, setArea] = React.useState([0, 500]);
    const handleChange = (event, newValue) => {
        setPrice(newValue);
    };


    useEffect(() => {
    }, []);

    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <React.Fragment>
                <Grid container xs={12} spacing={3} sx={{ pt: 3 }}>
                    <Grid item xs={3} spacing={3} >
                        <Paper variant="outlined" sx={{ position: "sticky", top: 90, p: 3, backgroundColor: "#FEBB02bb", border: "none" }}>
                            City:
                            <TextField fullWidth variant="filled" sx={{ backgroundColor: "white", mb: 3 }} id="city_name" />
                            Price range:
                            <Slider
                                value={price}
                                onChange={handleChange}
                                valueLabelDisplay="on"
                                valueLabelFormat={(value) => "$ " + value}
                                max={999999}
                                min={0}
                                sx={{ mt: 5 }}
                            />
                            Area:
                            <Slider
                                value={area}
                                onChange={(e, val) => { setArea(val) }}
                                valueLabelDisplay="on"
                                valueLabelFormat={(value) => value + " m²"}
                                max={500}
                                min={0}
                                sx={{ mt: 5 }}
                            />
                            <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
                                <FormControlLabel control={<Checkbox defaultChecked id="house" icon={<HomeIcon color="disabled" />} checkedIcon={<HomeIcon />} />} label="House" />
                                <FormControlLabel control={<Checkbox id="apartment" defaultChecked icon={<ApartmentIcon color="disabled" />} checkedIcon={<ApartmentIcon />} />} label="Apartment" />
                            </FormGroup>
                            <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center" }}>
                                <FormControlLabel control={<Checkbox id="pet_friendly" defaultChecked icon={<PetsIcon color="disabled" />} checkedIcon={<PetsIcon />} />} label="Pet Friendly" />

                            </FormGroup>

                            <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={() => { getData() }}>Filter</Button>
                        </Paper>
                    </Grid>
                    <Grid container item xs={9} spacing={3} sx={{ pt: 3 }}>


                        {
                            data.map(property => (
                                <Grid item xs={12} key={property.id}>

                                    <PropertyCard
                                        description={property.description}
                                        photo={property.photos[0]}
                                        name={property.name}
                                        address={property.address}
                                        price={property.price}
                                        area={property.area+" m²"}
                                        amenities={property.amenities}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </React.Fragment>
        </Container>
    );
}
