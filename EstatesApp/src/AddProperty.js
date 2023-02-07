import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
    Button,
    Typography,
    TextField,
    Container,
    CssBaseline,
    Box,
    Select,
    MenuItem,
    Radio,
    Grid,
    Paper,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RadioGroup from '@mui/material/RadioGroup';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function AddProperty(props) {
    const theme = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    async function _submitForm(values, actions) {

        console.log("NAME "+propertyName);
        console.log("DESCRIPTION "+propertyDescription);
        console.log("CITY "+propertyCity);
        console.log("ADDRESS "+propertyAddress);
        console.log("AREA "+propertyArea);
        console.log("TYPE "+propertyType);
        console.log("ROOMS "+propertyRoomCount);
        console.log("PRICE "+propertyPrice);
        console.log("MIN RENT "+propertyMinRent);
        console.log("PET FRIENDLY "+propertyPetFriendly);
        console.log("EXPENSES COVERED "+propertyExpensesCovered);
        console.log("AMENITIES "+amenityList);
        const response = await fetch(
            "http://localhost:5100/api/Property/AddProperty",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({id:"", name: propertyName, description: propertyDescription, cityName: propertyCity, address: propertyAddress, photos:[], area: propertyArea, propertyType: propertyType, roomCount:propertyRoomCount, amenities: amenityList, price: propertyPrice, expensesCovered: propertyExpensesCovered, petFriendly: propertyPetFriendly, minimalRentPeriod: propertyMinRent, qAs:[]  })
            }
        )
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const response2 = await fetch(
                "http://localhost:5100/api/Landlord/AddPropertyToLandlord/" +
                data.id, "/63c077a69352d5a35952c645",
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    // body: JSON.stringify({name: propertyName, description: propertyDescription, cityName: propertyCity, address: propertyAddress, photos:[], area: propertyArea, propertyType: propertyType, roomCount:propertyRoomCount, amenities: amenityList, price: propertyPrice, expensesCovered: propertyExpensesCovered, petFriendly: propertyPetFriendly, minimalRentPeriod: propertyMinRent, qAs:[]  })
                }
            )
            navigate("/AddedPropertyPage");
        }
    }

    const [propertyName, setPropertyName] = useState("");

    const [propertyDescription, setPropertyDescription] = useState("");

    const [propertyCity, setPropertyCity] = useState("");

    const [propertyAddress, setPropertyAddress] = useState("");

    const [propertyArea, setPropertyArea] = useState(0);

    const [propertyType, setPropertyType] = useState("");

    const [propertyRoomCount, setPropertyRoomCount] = useState(0);

    const [propertyPrice, setPropertyPrice] = useState(0);

    const [propertyMinRent, setPropertyMinRent] = useState(0);

    const [propertyPetFriendly, setPropertyPetFriendly] = useState(0);

    const [propertyExpensesCovered, setPropertyExpensesCovered] = useState(0);

    const [amenityList, setAmenityList] = useState([{ amenities: "" }]);

    // const handleSubmit = () => console.log(textValue);

    const handleAmenityAdd = () => {
        setAmenityList([...amenityList, { amenity: "" }])
    }

    console.log(amenityList);

    const handleAmenityRemove = (index) => {
        const list = [...amenityList];
        list.splice(index, 1);
        setAmenityList(list);
    }

    const handleAmenityChange = (event, index) => {
        const { value, name } = event.target;
        const list = [...amenityList];
        list[index][name] = value;
        setAmenityList(list);
    }

    const handlePNChange = (event) => {
        setPropertyName(event.target.value);
    }
    const handlePDChange = (event) => {
        setPropertyDescription(event.target.value);
    }

    const handlePCChange = (event) => {
        setPropertyCity(event.target.value);
    }

    const handlePAChange = (event) => {
        setPropertyAddress(event.target.value);
    }

    const handlePAreaChange = (event) => {
        setPropertyArea(event.target.value);
    }

    const handlePTypeChange = (event) => {
        setPropertyType(event.target.value);
    }

    const handlePRoomCntChangeChange = (event) => {
        setPropertyRoomCount(event.target.value);
    }

    const handlePPriceChange = (event) => {
        setPropertyPrice(event.target.value);
    }

    const handlePMinRentChange = (event) => {
        setPropertyMinRent(event.target.value);
    }

    const handlePPetFChange = (event) => {
        setPropertyPetFriendly(event.target.value);
    }

    const handlePExpCov = (event) => {
        setPropertyExpensesCovered(event.target.value);
    }

    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Add new property
                </Typography>
                <Paper
                    sx={{ p: 3, mb: 4, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }}
                    variant="outlined"
                >
                    <Typography component="h1" variant="h6" align="center" sx={{ m: 2 }}>
                        Fill out the following fields in order to post a new property ad on our website!
                    </Typography>
                </Paper>
                <Paper
                    sx={{ p: 3, mb: 4 }}
                    variant="outlined"
                >

                <Grid item xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <Typography component="subtitle1" align="center" sx={{ m: 2 }}> What type of property are you listing? </Typography>
                                <Select fullWidth
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={propertyType}
                                    onChange={handlePTypeChange}
                                >
                                    <MenuItem value={0}>House</MenuItem>
                                    <MenuItem value={1}>Apartment</MenuItem>
                                </Select>
                            </FormControl>

                </Grid>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> What is the name of the property? </Typography>
                        <TextField onChange={(event) => handlePNChange(event)} name={"propertyName"} label={"Enter property name"} fullWidth />

                </Grid>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> Provide a short description of the property </Typography>
                        <TextField multiline rows={5} onChange={(event) => handlePDChange(event)} name={"propertyDecsription"} label={"Enter property description"} fullWidth />

                </Grid>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> Where is the property located (City)? </Typography>
                        <TextField onChange={(event) => handlePCChange(event)} name={"propertyCity"} label={"Enter property city"} fullWidth />

                </Grid>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> Where is the property located (Address)? </Typography>
                        <TextField onChange={(event) => handlePAChange(event)} name={"propertyAddress"} label={"Enter property address"} fullWidth />

                </Grid>

                <Paper sx={{ p: 3, mb: 4, mt:3, backgroundColor: theme.palette.mode === 'dark' ? "#3a3b3c" : "whitesmoke", }} style={{ display: "flex", flexDirection: "column", alignItems: "space-between" }}
                        variant="outlined">
                        <Typography align="center" sx={{ m: 2 }}> <LightbulbCircleIcon style={{ color: "red" }} /> Does the property have any amenities worth listing? </Typography>
                        {
                            amenityList.map((singleamenity, index) => (
                                <Grid>
                                    {(amenityList.length == 1) ?
                                        (
                                            <Grid style={{ display: "flex", flexDirection: "row" }}>
                                                <TextField name={"amenity"} value={singleamenity.amenity} onChange={(event) => handleAmenityChange(event, index)} style={{ marginBottom: 10, marginRight: 5 }} label={"eg. Pool, Water fountain, Botanical garden, Garage..."} fullWidth />
                                            </Grid>
                                        ) :
                                        (
                                            <Grid style={{ display: "flex", flexDirection: "row" }}>
                                                <TextField name={"amenity"} value={singleamenity.amenity} onChange={(event) => handleAmenityChange(event, index)} style={{ marginBottom: 10, marginRight: 5 }} label={"eg. Pool, Water fountain, Botanical garden, Garage..."} fullWidth />
                                                <IconButton aria-label="delete" onClick={() => handleAmenityRemove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>

                                        )}

                                    {(amenityList.length - 1 === index) ?
                                        (
                                            <Grid>
                                                <Button onClick={handleAmenityAdd} variant="contained" sx={{ mt: 2 }} startIcon={<AddBoxIcon />} > Add amenity</Button>
                                            </Grid>
                                        ) : ""}
                                </Grid>
                            ))
                        }

                </Paper>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> How large is the property? </Typography>
                        <TextField onChange={(event) => handlePAreaChange(event)} name={"propertyArea"} label={"Enter property area in square meters"} fullWidth />

                </Grid>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> How many rooms does the property have? </Typography>
                        <TextField onChange={(event) => handlePRoomCntChangeChange(event)} name={"propertyRoomCount"} label={"Enter number of rooms"} fullWidth />

                </Grid>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> Please provide a monthly price of rent </Typography>
                        <TextField onChange={(event) => handlePPriceChange(event)} name={"propertyPrice"} label={"Enter the price for one month of renting"} fullWidth />

                </Grid>

                <Grid item xs={12} style={{ top: 10,alignItems: "center", justifyContent: "center" }}>
                        <Typography align="center" sx={{ m: 2 }}> Please provide a minimum renting period </Typography>
                        <TextField onChange={(event) => handlePMinRentChange(event)} name={"propertyMinRent"} label={"Enter minimal renting period"} fullWidth />

                </Grid>

                <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Is the property pet friendly? </Typography>
                            <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
                                <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={propertyPetFriendly}
                                    onChange={handlePPetFChange}
                                >
                                    <Grid style={{ display: "inline-block" }}>
                                        <FormControlLabel value="true" control={<Radio onChange={handlePPetFChange} />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio onChange={handlePPetFChange} />} label="No" />
                                    </Grid>

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid container xs={12} style={{ top: 10, alignItems: "center", justifyContent: "center" }}>
                            <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Are basic living expenses covered? </Typography>
                            <FormControl style={{ alignItems: "column", justifyContent: "column" }}>
                                <RadioGroup style={{ alignItems: "column", justifyContent: "column" }}
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={propertyExpensesCovered}
                                    onChange={handlePExpCov}
                                >
                                    <Grid style={{ display: "inline-block" }}>
                                        <FormControlLabel value="true" control={<Radio onChange={handlePExpCov} />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio onChange={handlePExpCov} />} label="No" />
                                    </Grid>

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Button onClick={_submitForm}
                            variant="contained" endIcon={<SendIcon />}> Submit listing </Button>
                    {/* </Box> */}
                </Paper>

            </React.Fragment>
        </Container>
    );
}