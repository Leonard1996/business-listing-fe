import { Card, Grid, Button, Typography, TextField, CircularProgress, CardContent, Box } from "@mui/material";
import styles from "./Authenticate.module.scss";
import { schema } from "../../Validation/Authenticate";
import { useRef, useState } from "react";

export const inputSx = {
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
};

export default function Authentication() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const numberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [error, setError] = useState({
    inputOrder: null,
    helperText: null,
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formInput = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: numberRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    console.log(formInput);

    const options = {
      strict: true,
      abortEarly: true,
      stripUnknown: false,
      recursive: true,
    };

    schema.validate(formInput, options).catch((error) => {
      console.log(error.errors);
      const [inputOrder, helperText] = error.errors[0].split(",");
      setError({
        inputOrder,
        helperText,
      });
    });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ margin: "100px auto" }}>
      <Grid item xs={12} sm={8} md={5}>
        <Card elevation={3}>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <Box p={3} paddingBottom={0}>
                <TextField
                  error={error.inputOrder === "1" ? true : false}
                  helperText={error.inputOrder === "1" ? error.helperText : null}
                  type="text"
                  label="First name"
                  variant="outlined"
                  fullWidth
                  sx={inputSx}
                  inputRef={firstNameRef}
                />
              </Box>
              <Box p={3} paddingBottom={0}>
                <TextField
                  error={error.inputOrder === "2" ? true : false}
                  helperText={error.inputOrder === "2" ? error.helperText : null}
                  type="text"
                  label="Last name"
                  variant="outlined"
                  fullWidth
                  sx={inputSx}
                  inputRef={lastNameRef}
                />
              </Box>
              <Box p={3} paddingBottom={0}>
                <TextField
                  error={error.inputOrder === "3" ? true : false}
                  helperText={error.inputOrder === "3" ? error.helperText : null}
                  type="text"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={inputSx}
                  inputRef={emailRef}
                />
              </Box>
              <Box p={3} paddingBottom={0}>
                <TextField
                  error={error.inputOrder === "4" ? true : false}
                  helperText={error.inputOrder === "4" ? error.helperText : null}
                  type="tel"
                  label="Phone number"
                  variant="outlined"
                  fullWidth
                  sx={inputSx}
                  inputRef={numberRef}
                />
              </Box>
              <Box p={3} paddingBottom={0}>
                <TextField
                  error={error.inputOrder === "5" ? true : false}
                  helperText={error.inputOrder === "5" ? error.helperText : null}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  sx={inputSx}
                  inputRef={passwordRef}
                />
              </Box>
              <Box p={3} paddingBottom={0}>
                <TextField
                  error={error.inputOrder === "6" ? true : false}
                  helperText={error.inputOrder === "6" ? error.helperText : null}
                  type="password"
                  label="Confirm password"
                  variant="outlined"
                  fullWidth
                  sx={inputSx}
                  inputRef={confirmPasswordRef}
                />
              </Box>
              <Box p={3} paddingBottom={0} sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained" className={styles["card__button"]}>
                  <Typography variant="caption">Register</Typography>
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
