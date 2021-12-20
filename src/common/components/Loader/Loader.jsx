import Dialog from "@mui/material/Dialog";
import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Loader({ loading, success, error, handleClose, open }) {
  React.useEffect(() => {
    let id = null;
    if (success || error) {
      id = setTimeout(() => {
        handleClose();
      }, 2000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [success, error]);

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          minHeight: "100vh",
          width: "100%",
        },
      }}
      sx={{
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose(event, reason);
        }
      }}
    >
      <Grid container sx={{ width: "100%", minHeight: "100vh" }} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          {loading && !success && (
            <div>
              <CircularProgress color="warning" />
              <Typography variant="h6" sx={{ color: "white" }}>
                {loading}
              </Typography>
            </div>
          )}
          {success && !loading && (
            <Zoom in={success}>
              <div>
                <CheckCircleOutlineIcon sx={{ fill: "green", transform: "scale(2.5)" }} />
                <Box p={2}>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    {success}
                  </Typography>
                </Box>
              </div>
            </Zoom>
          )}
          {error && !loading && (
            <Zoom in={error}>
              <div>
                <ErrorOutlineIcon sx={{ fill: "red", transform: "scale(2.5)" }} />
                <Box p={2}>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    {error}
                  </Typography>
                </Box>
              </div>
            </Zoom>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
}
