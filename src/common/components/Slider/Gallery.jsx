import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Grid, Dialog, Box } from "@mui/material";
import styles from "./Slider.module.scss";
import React from "react";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Gallery({ images }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const [src, setSrc] = React.useState({
    src: null,
    open: false,
  });

  const [deg, setDeg] = React.useState(0);

  const handleRotate = () => {
    setDeg((prevDeg) => prevDeg + 90);
  };

  const handleClose = () => {
    setSrc({ src: null, open: false });
    setDeg(0);
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Carousel responsive={responsive} infinite={true}>
            {images?.map((image, _index) => (
              <div className={styles["container"]} key={_index}>
                {/* <div style={{backprocess.env.REACT_APP_STATIC_SERVER + image?.path}}/> */}
                <div
                  onClick={() => setSrc({ src: process.env.REACT_APP_STATIC_SERVER + image?.path, open: true })}
                  style={{
                    backgroundImage: `url("${process.env.REACT_APP_STATIC_SERVER + image?.path}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll",
                    height: "100px",
                    width: "100px",
                    backgroundSize: "cover",
                    cursor: "pointer",
                  }}
                ></div>
              </div>
            ))}
          </Carousel>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleClose}
        open={src.open}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          },
        }}
      >
        <div style={{ position: "fixed", top: "0.75rem", right: "0.75rem", cursor: "pointer" }} onClick={handleClose}>
          <CancelIcon sx={{ fill: "red", transform: "scale(1.2)" }} />
        </div>
        <div>
          <img src={src.src} width="100%" height="100%" style={{ transform: `rotate(${deg}deg)` }} />
        </div>
        <Box
          sx={{
            position: "absolute",
            bottom: "2rem",
            width: "100%",
            zIndex: "100",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CropRotateIcon
            onClick={handleRotate}
            sx={{ fill: "white", transform: "scale(1.5)", marginX: "1rem", cursor: "pointer" }}
          />
        </Box>
      </Dialog>
    </>
  );
}
