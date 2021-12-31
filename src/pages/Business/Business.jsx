import React from "react";
import { Button, Grid, Typography, useMediaQuery, TextField } from "@mui/material";
import Hero from "../../common/components/Hero/Hero";
import { getBusiness, insertMessage } from "./business.service";
import { Box } from "@mui/system";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import styles from "./Business.module.scss";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HotelIcon from "@mui/icons-material/Hotel";
import Gallery from "../../common/components/Slider/Gallery";
import ReadOnlyMap from "../../common/components/ReadOnlyMap/ReadOnlyMap";
import { inputSx } from "../Authenticate/Authenticate";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SellIcon from "@mui/icons-material/Sell";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EventIcon from "@mui/icons-material/Event";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

export default function Business(props) {
  let timerId;
  const [business, setBusiness] = React.useState({});
  const [message, setMessage] = React.useState({
    disabled: false,
    innerText: "CONTACT SELLER",
  });
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const nameRef = React.useRef(null),
    emailRef = React.useRef(null),
    subjectRef = React.useRef(null),
    messageRef = React.useRef(null);

  const fetchBusiness = async (id) => {
    const [result, error] = await getBusiness(id);
    if (!error) {
      const banner = result.data?.data?.attachments?.find((attachment) => attachment.isBanner);
      setBusiness({ ...result.data.data, ...(banner && { path: banner.path }) });
    } else {
      props.history.push("/");
    }
  };

  React.useEffect(() => {
    fetchBusiness(props.match.params.businessId);
    return () => clearInterval(timerId);
  }, []);

  const replacer = (entry, isCurrency) => {
    if (+entry > -1 && isCurrency) return "$ " + entry;
    if (entry) return entry;
    return "N/A";
  };

  const handleSubmit = async (event) => {
    setMessage({ disabled: true, innerText: "CONTACT SELLER" });
    event.preventDefault();
    const [message, error] = await insertMessage(business?.id, {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
    });
    if (!error) {
      setMessage({ disabled: true, innerText: "MESSAGE SENT" });
      timerId = setTimeout(() => {
        setMessage({ disabled: false, innerText: "CONTACT SELLER" });
      }, 2000);
    } else {
      setMessage({ disabled: true, innerText: "COULD NOT SEND MESSAGE" });
      timerId = setTimeout(() => {
        setMessage({ disabled: false, innerText: "CONTACT SELLER" });
      }, 2000);
    }
  };

  return (
    <>
      <Hero
        src={
          "https://valhallainvestments.co.uk/wp-content/uploads/2021/08/business-partners-handshake-international-business-concept-scaled.jpg"
        }
      />
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={8}>
          <Box p={4} marginY={2}>
            <Typography variant="h5" sx={{ color: "#d4ae36" }}>
              {business.title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={0} md={4} />
        <Grid item xs={12}>
          <Box p={4}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div>
                  <img src={process.env.REACT_APP_STATIC_SERVER + business.path} />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={styles["container"]}>
                  <p className={styles["container__description"]}>
                    {business.description}
                    <p>
                      <b>Services: </b>
                      {business.services}
                    </p>
                  </p>
                  <p>
                    Asking Price: <b>{replacer(business.askingPrice, true) + " (or open to offer)"}</b>
                  </p>
                  <p>
                    Reference: <b>{replacer(business.reference)}</b>
                  </p>
                  <p>
                    <Typography variant="caption">
                      To view full details of this business or talk to this seller please log in or sign up below
                    </Typography>
                  </p>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ marginY: "1rem" }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box m={2}>
                <Gallery images={business?.attachments ?? []} />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                alignItems: "center",
                ...(isSmallScreen && { justifyContent: "center" }),
              }}
            >
              <Button variant="contained" className={styles["card__button"]}>
                <Typography variant="caption">Contact Seller</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ backgroundColor: "#F6F6F7" }}>
          <Grid container>
            {business.hasOwnProperty("lastAnnualTurnover") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <ChangeCircleOutlinedIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Turnover</Typography>
                  <Typography variant="h6">{replacer(business.lastAnnualTurnover, true)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("lastAnnualProfit") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <SignalCellularAltOutlinedIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Net Profit</Typography>
                  <Typography variant="h6">{replacer(business.lastAnnualProfit, true)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("yearEstablished") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <EventAvailableOutlinedIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Established</Typography>
                  <Typography variant="h6">{replacer(business.yearEstablished?.slice(0, 4))}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("industry") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <HomeWorkIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Type</Typography>
                  <Typography variant="h6">{replacer(business.industry)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("noOfStaff") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <PeopleAltIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Staff</Typography>
                  <Typography variant="h6">{business.noOfStaff ? "Yes" : "No"}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("accomodation") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <>
                  <div style={{ padding: "2rem" }}>
                    <HotelIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                  </div>
                  <div style={{ width: "150px" }}>
                    <Typography variant="overline">Accomodation</Typography>
                    <Typography variant="h6">N/A</Typography>
                  </div>
                </>
              </Grid>
            )}
            {business.hasOwnProperty("noOfShareholders") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <AccountBoxIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Shareholders</Typography>
                  <Typography variant="h6">{business.noOfShareholders ? business.noOfShareholders : 0}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("ownerManaged") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <ManageAccountsIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Owner Managed</Typography>
                  <Typography variant="h6">{replacer(business.ownerManaged)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("reasonForSelling") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <SellIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Reason for selling</Typography>
                  <Typography variant="h6">{replacer(business.reasonForSelling)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("city") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <FmdGoodIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">City</Typography>
                  <Typography variant="h6">{replacer(business.city)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("dateAdded") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <EventIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Date listed</Typography>
                  <Typography variant="h6">{replacer(business.dateAdded?.slice(0, 10))}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("currentDebts") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <MoneyOffIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">Current debts</Typography>
                  <Typography variant="h6">{replacer(business.currentDebts, true)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("projectedAnnualProfit") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <MonetizationOnIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">projected annual profit</Typography>
                  <Typography variant="h6">{replacer(business.projectedAnnualProfit, true)}</Typography>
                </div>
              </Grid>
            )}
            {business.hasOwnProperty("projectedAnnualTurnover") && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginY: "1rem" }}
              >
                <div style={{ padding: "2rem" }}>
                  <SettingsBackupRestoreIcon sx={{ transform: "scale(2.5)", fill: "#D4AD36" }} />
                </div>
                <div style={{ width: "150px" }}>
                  <Typography variant="overline">projected annual turnover</Typography>
                  <Typography variant="h6">{replacer(business.projectedAnnualTurnover, true)}</Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ backgroundColor: "#D4AE36", display: "flex" }}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={9}>
              <Box p={4}>
                <Typography variant="h4" sx={{ color: "white" }}>
                  Need funding to buy a business?
                </Typography>
                <Typography variant="caption" sx={{ color: "white" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box p={4}>
                <Button color="warning" sx={{ backgroundColor: "white" }} variant="contained">
                  <Typography sx={{ color: "#D4AE36", fontSize: "0.75rem" }}>Get in touch</Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ReadOnlyMap lat={business?.mapPositionLat} lng={business?.mapPositionLng} />
        </Grid>
        <Grid item xs={12}>
          <Box m={6} sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#D4AE36" }} variant="h4">
              Similar businesses for sale
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ backgroundColor: "black", padding: "3rem" }}>
          <Grid container>
            <Grid item xs={12}>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "0.4rem",
                  paddingRight: "0.6rem",
                  display: "inline-block",
                  clipPath: "polygon(0% 0%, 92% 0, 96% 50%, 100% 100%, 0% 100%)",
                }}
              >
                <Typography sx={{ color: "black" }}>Our story</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Box marginY={2}>
                <Typography variant="h5" sx={{ color: "white" }}>
                  About Bizdaq Investments
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box marginY={2}>
                <Typography variant="body2" sx={{ color: "white" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box marginY={2}>
                <Typography variant="body2" sx={{ color: "white" }}>
                  Sed ut perspiciatis unde omnis iste natus error sit vo- luptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                </Typography>
              </Box>
            </Grid>
            {isSmallScreen && (
              <Grid item xs={12}>
                <Box paddingY={1}>
                  <Button variant="contained" className={styles["card__button"]}>
                    <Typography variant="caption">Learn More</Typography>
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: "3rem" }}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <div
                  style={{
                    backgroundColor: "#E8E8E8",
                    padding: "0.5rem",
                    paddingRight: "0.6rem",
                    display: "inline-block",
                    clipPath: "polygon(0% 0%, 92% 0, 96% 50%, 100% 100%, 0% 100%)",
                  }}
                >
                  <Typography sx={{ color: "black" }}>Contact us</Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Box marginY={2}>
                  <Typography variant="h5">Drop us a line</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingY={1}>
                  <TextField
                    id="standard-basic"
                    label="Your Name (required)"
                    variant="standard"
                    required
                    fullWidth
                    sx={inputSx}
                    inputRef={nameRef}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingY={1}>
                  <TextField
                    id="standard-basic"
                    label="Your Email (required)"
                    variant="standard"
                    required
                    fullWidth
                    sx={inputSx}
                    inputRef={emailRef}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingY={1}>
                  <TextField
                    id="standard-basic"
                    label="Subject"
                    variant="standard"
                    fullWidth
                    sx={inputSx}
                    color="warning"
                    inputRef={subjectRef}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box paddingY={1}>
                  <textarea
                    ref={messageRef}
                    placeholder="Message"
                    style={{
                      width: "100%",
                      height: "60px",
                      border: "none",
                      borderBottom: "1px solid #D4AD36",
                      outline: "none",
                      resize: "none",
                    }}
                  />
                </Box>
              </Grid>
              {isSmallScreen && (
                <Grid item xs={12}>
                  <Box paddingY={1}>
                    <Button
                      variant="contained"
                      className={styles["card__button"]}
                      onClick={handleSubmit}
                      disabled={message.disabled}
                    >
                      <Typography variant="caption">{message.innerText}</Typography>
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
            <input type="submit" hidden />
          </form>
        </Grid>
        {isSmallScreen ? null : (
          <>
            <Grid item xs={6} sx={{ paddingX: "3rem", backgroundColor: "black" }}>
              <Box paddingY={3}>
                <Button variant="contained" className={styles["card__button"]}>
                  <Typography variant="caption">Learn More</Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ paddingX: "3rem" }}>
              <Box paddingY={3}>
                <Button
                  variant="contained"
                  className={styles["card__button"]}
                  onClick={handleSubmit}
                  disabled={message.disabled}
                >
                  <Typography variant="caption">{message.innerText}</Typography>
                </Button>
              </Box>
            </Grid>
          </>
        )}

        {!isSmallScreen && (
          <Grid item xs={12}>
            <Box m={4}></Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
