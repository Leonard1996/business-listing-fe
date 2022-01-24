import { useParams } from "react-router-dom";
import { TextField, Grid, Button, Box } from "@mui/material";
import axios from "axios";
import { inputSx } from "../Authenticate/Authenticate";
import React from "react";
import Notification from "../../common/components/Notification/Notification";

export default function ResetPassword() {
  const { token } = useParams();
  const [loading, setLoading] = React.useState(false);
  const passwordRef = React.useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.post(process.env.REACT_APP_API + "/profile/change-password", {
        password: passwordRef.current.value,
        token,
      });
      setNotification((prevNotification) => ({
        ...prevNotification,
        open: true,
      }));
    } catch (error) {
      setNotification((prevNotification) => ({
        ...prevNotification,
        open: true,
        message: "Could not reset password",
        severity: "error",
      }));
    }

    setLoading(false);
  };

  const [notification, setNotification] = React.useState({
    message: "Password reset successfully",
    severity: "success",
    handleClose: () => setNotification({ ...notification, open: false }),
    open: false,
  });

  return (
    <>
      <Grid container sx={{ minHeight: "80vh" }} justifyContent="center" alignItems="center">
        <form onSubmit={handleSubmit} style={{ width: "300px" }}>
          <Grid item xs={12}>
            <TextField sx={inputSx} inputRef={passwordRef} fullWidth label="New password" type="password" />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box p={2}>
              <Button type="submit" color="warning" variant="outlined" disabled={loading}>
                {!loading ? "Reset Password" : "Please wait"}
              </Button>
            </Box>
          </Grid>
        </form>
      </Grid>
      {notification.open && <Notification {...notification} />}
    </>
  );
}
