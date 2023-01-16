import {
  Button,
  Card,
  Divider,
  Typography,
  Grid,
  Checkbox,
  Link,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PaperCard({ info, index }) {
  const navigate = useNavigate();
  const [infos, setInfos] = useState([]);
  const theme = useTheme();

  const { id } = useParams();

  const getInformations = async () => {
    let response;

    response = await fetch(
      "http://localhost:5100/api/Property/GetProperty/" + info,
      {
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    setInfos(data);
  };

  useEffect(() => {
    getInformations();
  }, []);

  return (
    <Card variant="outlined" sx={{ p: 3, width: "100%" }}>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
            <Link
              href={"http://"}
              variant="h5"
              align="left"
              sx={{ align: "left" }}
            >
              {infos.name}
            </Link>
          </Grid>

          <Divider sx={{ width: "100%" }} />
          <Typography
            variant="subtitle1"
            align="left"
            sx={{ display: infos.price == undefined ? "none" : "" }}
          >
            {infos.area + " sqm for " + infos.price + " eur"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            align="left"
            variant="body2"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              mb: 1,
            }}
          >
            {infos.description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
