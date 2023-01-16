import { Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaperCard from "./PaperCard";

export default function PropertyList({ PropertyIds }) {
  const [infos, setInfos] = useState([]);
  const theme = useTheme();

  const { id } = useParams();

  // const getInformations = async () => {
  //   let response;
  //   let data = [];

  //   PropertyIds.forEach(async element => {
  //     response = await fetch(
  //       "http://localhost:5100/api/Property/GetProperty/" + element,
  //       {
  //         credentials: "include",
  //       }
  //     );
     
  //     data.Append(response)
  //   });
    
  //   console.log(data);
  //   setInfos(data);
  // };

  useEffect(() => {
    // getInformations();
  }, []);

  return (
    <Grid container spacing={3}>
      {console.log(PropertyIds)}
      {PropertyIds.map((info, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <PaperCard
            info={info}
            index={index}
          />
          
        </Grid>
      ))}
    </Grid>
  );
}
