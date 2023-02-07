import { Paper, CssBaseline, Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Tabs,
    Tab,
    Typography,
    Avatar,
    Grid,
    Divider,
    TextField,
    IconButton,
    useTheme
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import CardActions from "@mui/material/CardActions";

export default function PropertyProfile({ type, reloadHeader }) {

    const theme = useTheme();

    var curInd=0;

    const { id } = useParams();

    const navigate = useNavigate();

    const [newQuestion, setNewQuestion] = useState([]);

    const [newAnswer, setNewAnswer] = useState("");

    const [newAnswerIndex, setNewAnswerIndex] = useState(0);

    const handleQAChange = async (event) => {
        setNewQuestion(event.target.value);
      };

      const handleAQChange = async (event) => {
        setNewAnswer(event.target.value);
      };

      const handleAIndexChange = async (event) => {
        setNewAnswerIndex(event.target.value);
      };

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

    async function _submitForm(values, actions) {
        const response = await fetch(
          "http://localhost:5100/api/QA/Ask/" + id + "/"+
            newQuestion,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
    
        getInfo();
    
        if (response.ok) {
          const data = await response.json();
          // setSubmitted("yes");
          getInfo();
        }
      }

      async function _submitAnswer(values, actions) {
        console.log(newAnswer);
        console.log(curInd);
        // const response = await fetch(
        //   "http://localhost:5100/api/QA/Answer/" + id + "/"+
        //     newAnswer+"/"+newAnswerIndex,
        //   {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
    
        // getInfo();
    
        // if (response.ok) {
        //   const data = await response.json();
        //   // setSubmitted("yes");
        //   getInfo();
        // }
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
          <Grid>
          <Typography
            variant="h5"
            align="left"
            sx={{ mt:2, display: info.price == undefined ? "none" : "" }}
          >
            <LocationOnIcon sx={{fontSize:"30px"}}/> {info.address + ", " + info.cityName}
          </Typography>
          <Typography
            variant="h5"
            align="left"
            sx={{ mt:1, display: info.price == undefined ? "none" : "" }}
          >
            <MapsHomeWorkIcon sx={{fontSize:"30px"}}/> {info.area + " sqm for " + info.price + " eur per month"}
          </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            align="left"
            variant="h6"
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 35, mt: 3, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Basic info" />
                        <Tab label="Amenities" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Property Photos" sx={{ display: type === "public" ? "none" : "" }} />
                        <Tab label="Q&A" sx={{ display: type === "public" ? "none" : "" }} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Grid>
                    <Paper sx={{height:35}}>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ mt:2, display: info.price == undefined ? "none" : "" }}
                    >
                        {"Property type: "} {info.propertyType==1?" Apartment":" House"}
                    </Typography>
                    </Paper>
                    <Paper sx={{height:35}}>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ mt:2, mb:1, display: info.price == undefined ? "none" : "" }}
                    >
                        {"Room count: "+info.roomCount} {info.roomCount==1?" room":" rooms"}
                    </Typography>
                    </Paper>
                    <Paper sx={{height:35}}>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ mt:2, mb:1, display: info.price == undefined ? "none" : "" }}
                    >
                        {"Minimal rent period: "+info.minimalRentPeriod} {info.minimalRentPeriod==1 ? "month":"months"}
                    </Typography>
                    </Paper>
                    <Paper sx={{height:35}}>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ mt:2, mb:1, display: info.price == undefined ? "none" : "" }}
                    >
                        {"Expenses covered: "} {info.expensesCovered==true?" Yes":" No"}
                    </Typography>
                    </Paper>
                    <Paper sx={{height:35}}>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ mt:2, mb:1, display: info.price == undefined ? "none" : "" }}
                    >
                        {"Pet friendly: "} {info.petFriendly==true?" Yes":" No"}
                    </Typography>
                    </Paper>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                {info.amenities.length==0?"Currently no amenities to display":info.amenities
                                //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                                .map((am, index) => {
                                    return (
                                        <Grid item >
                                          <Typography style={{marginRight:20, marginBottom:10, marginTop:10}} variant='h5' align="center">{am}</Typography>
                                          <Divider  style={{marginBottom:10}}></Divider>
                                          </Grid>
                                          );
                                })}
                </TabPanel>
                <TabPanel value={value} index={2}>
                {info.photos.length==0?"Currently no photos to display":info.photos
                                //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                                .map((photo, index) => {
                                    return (
                                        <CardMedia
                                            sx={{mb:2}}
                                            component="img"
                                            height={250}
                                            width={200}
                                            image={"https://www.gannett-cdn.com/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp"}
                                            alt=" "
                                        />
                                          );
                                })}
                </TabPanel>
                <TabPanel value={value} index={3}>
                <TextField name={"amenity"} 
                value={newQuestion} 
                onChange={(event) => handleQAChange(event)} style={{ marginBottom: 10, marginRight: 5 }} 
                label={"Ask a new question about this property"} 
                fullWidth />
                    <Button
                    onClick={_submitForm}
                    color="primary"
                    aria-label="add an alarm"
                    variant="contained"
                    >
                    <AddIcon /> Add Question
                    </Button>
                    <Divider  style={{marginBottom:10, marginTop:10}}></Divider>
                {info.qAs.length==0?"Currently no questions to display":info.qAs
                                //.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                                .map((qa, index) => {
                                    return (
                                        <Grid>
                                            <Typography
                                            variant="h5"
                                            align="center"
                                            sx={{ mt:1, mb:1, display: info.price == undefined ? "none" : "" }}
                                        >
                                            {"Question "+(index+1)+":"} {qa.question}
                                            </Typography>
                                            <Typography
                                            variant="h5"
                                            align="center"
                                            sx={{ mt:1, mb:1, display: info.price == undefined ? "none" : "" }}
                                        >
                                            {"Answer to Q"+(index+1)+":"} {qa.answer==null?<Grid><TextField name={"amenity"} 
                                            value={newAnswer} 
                                            onChange={(event) => {handleAQChange(event);curInd=index}} style={{ marginBottom: 10, marginRight: 5 }} 
                                            label={"Answer to question "+(index+1)} 
                                            fullWidth /><Button onClick={_submitAnswer} variant="contained">Answer question</Button></Grid>:qa.answer}
                                        </Typography>
                                        <Divider  style={{marginBottom:10}}></Divider>
                                        </Grid>
                                          );
                                })}
                </TabPanel>
        </Box>
        </Container>
    );
}