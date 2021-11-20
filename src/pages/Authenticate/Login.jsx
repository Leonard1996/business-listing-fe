import { Grid, Card, CardContent, Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRef, useEffect, useState, useContext } from "react";
import { inputSx } from "./Authenticate";
import styles from "./Authenticate.module.scss";
import { login } from "./authenticate.service";
import Notification from "../../common/components/Notification/Notification";
import { AuthContext } from "../../context/Auth/Auth";

export default function Login(props) {
  const emailRef = useRef(null),
    passwordRef = useRef(null),
    formRef = useRef(null);

  const { accessToken, setToken } = useContext(AuthContext);

  if (accessToken) {
    props.history.push("/dashboard");
  }

  const [notification, setNotification] = useState({
    message: "Wrong credentials or account not active",
    severity: "error",
    handleClose: () => setNotification({ ...notification, open: false }),
    open: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const [response, error] = await login({ username: emailRef.current.value, password: passwordRef.current.value });
    if (error) {
      setIsLoading(true);
      setNotification((prevNotification) => {
        return {
          ...prevNotification,
          open: true,
        };
      });
      setIsLoading(false);
      return;
    }
    localStorage.setItem("token", JSON.stringify(response.data.data.accessToken));
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    setToken(response.data.data.accessToken);
    props.history.push("/dashboard");
  };

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(formRef.current.offsetHeight);
  }, []);

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
                      required
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
                      required
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      sx={inputSx}
                      inputRef={passwordRef}
                    />
                  </Box>
                  <Box p={3} paddingBottom={0} sx={{ textAlign: "center" }}>
                    <Button type="submit" variant="contained" className={styles["card__button"]}>
                      <Typography variant="caption">Login</Typography>
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
                      onClick={() => props.history.push("/signup")}
                    >
                      Don't have an account? Click here to register!
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
