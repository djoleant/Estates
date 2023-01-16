import {
  Button,
  Divider,
  Card,
  Box,
  Typography,
  Grid,
  IconButton,
  Avatar,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewCard({ text = "", rating = 0, personName = "" }) {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            marginLeft: 20,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {personName} rated 📑
        </Typography>
        <Typography
          style={{
            textAlign: "center",
            marginLeft: 20,
            fontSize: 25,
            cursor: "pointer",
          }}
        >
          {text}
        </Typography>
        <Typography
          style={{
            textAlign: "center",
            marginLeft: 20,
            fontSize: 25,
            cursor: "pointer",
          }}
          sx={{fontWeight: 'bold'}}
        >
          {rating} 
        </Typography>
        <Divider style={{ marginTop: 20 }}></Divider>
      </Grid>
    </Grid>
  );
}
