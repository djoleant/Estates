import { Paper, CssBaseline, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  useTheme,
} from "@mui/material";
import CardList from "./components/Profile/CardList";
import EditLandlord from "./components/Landlord/EditLandlord";
import { Navigate, useParams } from "react-router-dom";

export default function Landlord({ type, reloadHeader }) {
  const theme = useTheme();

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
        {value === index && <Box sx={{ p: 3, width: 1 }}>{children}</Box>}
      </Box>
    );
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [info, setInfo] = useState({
    name: "",
    contact: "",
    propertyIds: [],
    reviews: [],
    id: "",
  });

  const { id } = useParams();

  const getInfo = async () => {
    const response = await fetch(
      "http://localhost:5100/api/Landlord/GetLandlord/" + id,
      {
        credentials: "include",
      }
    );
    const fetchData = await response.json();
    console.log(fetchData);
    setInfo(fetchData);
  };

  const update = () => {
    getInfo();
    reloadHeader();
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Container component="main" sx={{ pt: 3 }}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant="h3" align="left">
           { info != undefined ? info.name : ""}
          </Typography>
          <Typography align="left">
            {info != undefined ? "Landlord" : ""}
          </Typography>
          <Typography align="left">
            {info != undefined ? info.contact : ""}
          </Typography>
          <Box sx={{ display: type === "public" ? "none" : "flex", mt: 1 }}>
            <EditLandlord
              currentName={info.name}
              currentContact={info.contact}
              Properties = {info.propertyIds}
              Reviews = {info.reviews}
              update={update}
            />
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "sticky",
            top: 65,
            mt: 4,
            zIndex: 20,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Tabs
            value={value}
            variant="scrollable"
            scrollButtons
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Papers" />
            <Tab
              label="Proceedings"
              sx={{ display: type === "public" ? "none" : "" }}
            />
            {/* <Tab label="Categories" sx={{ display: type === "public" ? "none" : "" }} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CardList type="papers" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CardList type="proceedings" />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
                    <CardList type="categories" />
                </TabPanel> */}
      </Box>
    </Container>
  );
}
