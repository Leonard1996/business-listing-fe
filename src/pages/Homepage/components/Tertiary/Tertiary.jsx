import { Typography, Grid, Box, Button, TextField, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./Tertiary.module.scss";
import React from "react";

export default function Tertiary() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const emailRef = useRef(null);
  const searchRef = React.useRef(null);
  const [buttonState, setButtonState] = useState({
    loading: false,
    text: "Join",
  });
  let timerId = null;

  const handleJoinClick = async () => {
    setButtonState({
      loading: true,
      text: "Submitting Email...",
    });
    try {
      await axios.post(process.env.REACT_APP_API + "/emails", { email: emailRef.current.value });
      setButtonState({
        loading: false,
        text: "Success",
      });
    } catch (error) {
      console.log(error);
    }
    timerId = setTimeout(() => {
      setButtonState({
        loading: false,
        text: "Join",
      });
    }, 2000);
  };

  useEffect(() => {
    return () => clearTimeout(timerId);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = searchRef.current.value.trim().split(" ").join("+");
    window.open("https://valhallainvestments.co.uk/?s=" + query, "_blank");
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box my={2}>
          <Typography variant="h6" textAlign="center" sx={{ fontWeight: "bold" }}>
            Get Growing!
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
            Vallhala is the go-to place to grow your business. Providing entrepreneurs,
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
            business owners or those seeking to buy with essential guides and
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
            insights.
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
            Join the fastest growing worldwide business community instantly
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box my={2} sx={{ textAlign: "center" }}>
          <TextField
            label="Email adress"
            variant="outlined"
            size="small"
            inputRef={emailRef}
            sx={{
              "& label.Mui-focused": {
                color: "#d4ae36",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#d4ae36",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d4ae36",
                },
                "&:hover fieldset": {
                  borderColor: "#d4ae36",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#d4ae36",
                },
              },
            }}
          />

          <Button
            variant="contained"
            className={styles["card__button"]}
            onClick={handleJoinClick}
            disabled={buttonState.loading}
          >
            <Typography variant="caption">{buttonState.text}</Typography>
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box marginTop={3} marginBottom={5} sx={{ textAlign: isSmallScreen ? "center" : "right", padding: "0 2rem" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              placeholder="Search"
              inputRef={searchRef}
              sx={{
                "& label.Mui-focused": {
                  color: "black",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "black",
                },
                "& .MuiOutlinedInput-root": {
                  background: "#DDD!important",
                  "& fieldset": {
                    borderColor: "black",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
            />
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
