import { Card, Grid, Button, Typography, TextField, CircularProgress, CardContent, Box } from "@mui/material";
import styles from "./Authenticate.module.scss";
import { schema } from "../../Validation/Authenticate";
import { useRef, useState, useEffect, useContext } from "react";
import { register } from "./authenticate.service";
import Notification from "../../common/components/Notification/Notification";
import { AuthContext } from "../../context/Auth/Auth";

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

export default function Authentication(props) {
  const nameRef = useRef(null);
  const surNameRef = useRef(null);
  const emailRef = useRef(null);
  const numberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const formRef = useRef(null);

  const { accessToken } = useContext(AuthContext);
  if (accessToken) {
    props.history.push("/dashboard");
  }

  const [notification, setNotification] = useState({
    message: "Check your email to active your account",
    severity: "success",
    handleClose: () => setNotification({ ...notification, open: false }),
    open: false,
  });

  const [error, setError] = useState({
    inputOrder: null,
    helperText: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(formRef.current.offsetHeight);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formInput = {
      name: nameRef.current.value,
      surname: surNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: numberRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    const options = {
      strict: true,
      abortEarly: true,
      stripUnknown: false,
      recursive: true,
    };

    schema
      .validate(formInput, options)
      .then(async () => {
        delete formInput.confirmPassword;
        setIsLoading(true);
        const [result, error] = await register(formInput);
        setIsLoading(false);
        if (error) {
          setNotification({
            ...notification,
            message: "User already exists",
            severity: "error",
            open: true,
          });

          return;
        }

        setNotification({
          ...notification,
          open: true,
        });
      })
      .catch((error) => {
        const [inputOrder, helperText] = error.errors[0].split(",");
        setError({
          inputOrder,
          helperText,
        });
      });
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ margin: "100px auto", padding: "16px" }}>
        <Grid item xs={12} sm={8} md={5}>
          <Card elevation={3}>
            <CardContent>
              {isLoading ? (
                <div style={{ height: `${height}px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CircularProgress color="warning" />
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} ref={formRef}>
                  <Box p={3} paddingBottom={0}>
                    <TextField
                      error={error.inputOrder === "1" ? true : false}
                      helperText={error.inputOrder === "1" ? error.helperText : null}
                      type="text"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      sx={inputSx}
                      inputRef={nameRef}
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
                      inputRef={surNameRef}
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
                      type="text"
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
                  <Box mt={4}>
                    <Typography
                      textAlign="center"
                      variant="body1"
                      color="primary"
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => props.history.push("/signin")}
                    >
                      Already have an account? Click here to sign up!
                    </Typography>
                  </Box>
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {notification.open && <Notification {...notification} />}
    </>
  );
}
