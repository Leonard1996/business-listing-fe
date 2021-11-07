import styles from "./Footer.module.scss";
import { Typography, TextField, Box } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <div className={styles["container"]}>
      <div className={styles["container__logo"]}>
        <Typography variant="h2" sx={{ color: "white" }}>
          Logo
        </Typography>
      </div>

      <div className={styles["container__categories"]}>
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d4ae36" }}>
            Explore
          </Typography>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              FREE Evaluation
            </Typography>
          </p>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              Buy
            </Typography>
          </p>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              Grow
            </Typography>
          </p>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              Sell
            </Typography>
          </p>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              About Us
            </Typography>
          </p>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              Contact Us
            </Typography>
          </p>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              FAQs
            </Typography>
          </p>
        </div>
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d4ae36" }}>
            Contacts
          </Typography>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              info@info.com
            </Typography>
          </p>
          <p>
            <Typography variant="body1" sx={{ fontWeight: "light", color: "white" }}>
              01702 123456
            </Typography>
          </p>
          <Box marginTop={6}>
            <p>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d4ae36" }}>
                Follow
              </Typography>
            </p>
            <p>
              <span>
                <FacebookIcon sx={{ fill: "white", cursor: "pointer", marginRight: "0.5rem" }} />
              </span>
              <span>
                <TwitterIcon sx={{ fill: "white", cursor: "pointer", marginRight: "0.5rem" }} />
              </span>
              <span>
                <InstagramIcon sx={{ fill: "white", cursor: "pointer", marginRight: "0.5rem" }} />
              </span>
              <span>
                <LinkedInIcon sx={{ fill: "white", cursor: "pointer", marginRight: "0.5rem" }} />
              </span>
            </p>
          </Box>
        </div>
        <div>
          <p>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d4ae36" }}>
              Get Growing
            </Typography>
          </p>
          <form>
            <TextField
              size="small"
              placeholder="Email Adress"
              sx={{
                "& label.Mui-focused": {
                  color: "black",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "black",
                },
                "& .MuiOutlinedInput-root": {
                  background: "#DDD!important",
                  marginBottom: "3rem",
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
        </div>
      </div>

      <div className={styles["container__bottom"]}>
        <p>
          <Typography variant="body2" sx={{ fontWeight: "light", color: "white" }}>
            © 2021 Valhalla Investments. Website Design by 07 Heaven Marketing
          </Typography>
        </p>
      </div>
    </div>
  );
}
