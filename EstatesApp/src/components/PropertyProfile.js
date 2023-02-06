import { Paper, CssBaseline, Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import {
    Tabs,
    Tab,
    Typography,
    Avatar,
    Grid,
    Divider,
    useTheme
} from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import CardActions from "@mui/material/CardActions";

export default function PropertyProfile({ type, reloadHeader }) {

    const theme = useTheme();

    const { id } = useParams();

    const navigate = useNavigate();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                sx={{ width: 1 }}
            >
                {value === index && (
                    <Box sx={{ p: 3, width: 1 }}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [info, setInfo] = useState({
        id:"",
        name:"",
        description:"",
        cityName:"",
        address:"",
        photos:[],
        area:0,
        propertyType:0,
        roomCount:0,
        amenities:[],
        price:"",
        expensesCovered:true,
        petFriendly:true,
        minimalRentPeriod:0,
        qAs:[]
    });

    const getInfo = async () => {
        const response = await fetch("http://localhost:5100/api/Property/GetProperty/"+id);
        if (response.ok) {
            const fetchData = await response.json();
            console.log(fetchData)
            //if (fetchData.cv.education.length > 0) {
            setInfo(fetchData);
            //}
        }
    }

    const update = () => {
        getInfo();
        reloadHeader();
    }

    useEffect(() => {
        getInfo();
        
    }, []);

    return (
        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h2"
              align="left"
              sx={{ align: "left" }}
            >
              {info.name}
            </Typography>
          </Grid>

          <Divider sx={{ width: "100%" }} />
          <Typography
            variant="h5"
            align="left"
            sx={{ mt:2, display: info.price == undefined ? "none" : "" }}
          >
            <MapsHomeWorkIcon sx={{fontSize:"30px"}}/> {info.area + " sqm for " + info.price + " eur"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            align="left"
            variant="body1"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              mb: 1,
            }}
          >
            {info.description}
          </Typography>
        </Grid>
      </Grid>
      <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Basic info" />
                        <Tab label="Amenities" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Additional info" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Property Photos" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Q&A" sx={{ display: type === "public" ? "none" : "" }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>

                </TabPanel>
                <TabPanel value={value} index={1}>

                </TabPanel>
                <TabPanel value={value} index={2}>

                </TabPanel>
                <TabPanel value={value} index={3}>

                </TabPanel>
                <TabPanel value={value} index={4}>

                </TabPanel>
        </Box>
        </Container>
    );
}