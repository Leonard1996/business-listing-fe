import {
  Grid,
  TextField,
  Box,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import { inputSx } from "../../../Authenticate/Authenticate";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";
import Map from "../../../../common/components/Map/Map";
import FileUploader from "../../../../common/components/FileUploader/FileUploader";
import { createBusiness } from "../../dashboard.service";
import { AuthContext } from "../../../../context/Auth/Auth";
import Loader from "../../../../common/components/Loader/Loader";

const items = [
  { type: "text", label: "Owner Name", name: "ownerName" },
  { type: "number", label: "Age", name: "age" },
  { type: "email", label: "Email", name: "email" },
  { type: "text", label: "Number", name: "number" },
  { type: "number", label: "No. of Staff", name: "noOfStaff" },
  { type: "number", label: "No. of Shareholders", name: "noOfShareholders" },
  { type: "select", label: "Relocatable", values: ["Yes", "No"], name: "relocatable" },
  { type: "select", label: "Owner Managed", values: ["Yes", "No"], name: "ownerManaged" },
  {
    type: "select",
    label: "Reason For Selling",
    values: ["Illness/Health", "Another venture", "Part of the plan"],
    name: "reasonForSelling",
  },
  { type: "textArea", label: "Services", name: "services" },
  //{type:"dropdown", label:"Town" },
  //{type:"dropdown", label:"County" },
  //{type:"dropdown", label:"Area" },
  { type: "textArea", label: "Description", name: "description" },
  { type: "datePicker", label: "Date added", name: "dateAdded" },
  { type: "text", label: "Reference", name: "reference" },
  {
    type: "select",
    label: "Industry",
    name: "industry",
    values: [
      `Agriculture, Horticulture & Marine`,
      `Bed & Breakfast, GuestHouse & Hotel`,
      `Building & Construction`,
      `Car, Motor & Transport`,
      `Care`,
      `Coaching, Education & Training`,
      `Commercial Property`,
      `Convenience, Newsagent & Post Office`,
      `Engineering & Manufacturing`,
      `Entertainment & Leisure`,
      `Financial & Professional`,
      `Food & Catering`,
      `Franchise Resale`,
      `Health & Beauty`,
      `Licensed & Public House`,
      `Media & Technology`,
      `Retail & Shop`,
      `Service`,
    ],
  },
  { type: "datePicker", label: "Year Established", name: "yearEstablished" },
  { type: "text", label: "Name of business", name: "nameOfBusiness" },
  { type: "text", label: "Title", name: "title" },
  { type: "currency", label: "Current Debts", name: "currentDebts" },
  { type: "currency", label: "Projected Annual Profit", name: "projectedAnnualProfit" },
  { type: "currency", label: "Last Annual Profit", name: "lastAnnualProfit" },
  { type: "currency", label: "Projected Annual Turnover", name: "projectedAnnualTurnover" },
  { type: "currency", label: "Last Annual Turnover", name: "lastAnnualTurnover" },
  { type: "currency", label: "Asking Price", name: "askingPrice" },

  //images
];

export default function MyBusiness(props) {
  const [selects, setSelects] = React.useState({
    relocatable: "Yes",
    ownerManaged: "Yes",
    reasonForSelling: "Illness/Health",
    industry: "Agriculture, Horticulture & Marine",
  });

  const { mapState } = React.useContext(AuthContext);

  const [dates, setDates] = React.useState({
    yearEstablished: new Date(),
    dateAdded: new Date(),
  });

  const [currencies, setCurrencies] = React.useState({
    currentDebts: 0,
    projectedAnnualProfit: 0,
    lastAnnualProfit: 0,
    projectedAnnualTurnover: 0,
    lastAnnualTurnover: 0,
    askingPrice: 0,
  });

  const handleSelectChange = (event) => {
    setSelects((prevSelects) => ({
      ...prevSelects,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateChange = (event, name) => {
    setDates((prevSelects) => ({
      ...prevSelects,
      [name]: event,
    }));
  };

  const [notes, setNotes] = React.useState({
    services: "",
    description: "",
  });

  const handleNotesChange = (event) => {
    setNotes((prevNotes) => ({ ...prevNotes, [event.target.name]: event.target.value }));
  };

  const [essentials, setEssentials] = React.useState({
    ownerName: "",
    age: 0,
    email: "",
    number: "",
    noOfStaff: 0,
    noOfShareholders: 0,
    reference: "",
    nameOfBusiness: "",
    title: "",
  });

  const handleEssentialsChange = (event) => {
    setEssentials((prevEssentials) => ({ ...prevEssentials, [event.target.name]: event.target.value }));
  };

  const [files, setFiles] = React.useState([]);

  const handleFileChange = (event) => {
    setFiles((prevFiles) => [...prevFiles, ...event.target.files].slice(0, 10));
  };

  const [banner, setBanner] = React.useState([]);

  const handleBannerChange = (event) => {
    setBanner([event.target.files[0]]);
  };

  const [loader, setLoader] = React.useState({
    open: false,
    loading: false,
    success: false,
    error: true,
  });

  const handleClose = () => {
    setLoader((prevLoader) => ({ ...prevLoader, open: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isWithBanner = banner?.length ? true : false;
    setLoader({
      open: true,
      loading: "Saving your business, please wait...",
      success: false,
      error: false,
    });

    const [result, error] = await createBusiness({
      files: [...banner, ...files],
      essentials,
      notes,
      currencies,
      dates,
      selects,
      mapState,
      isWithBanner,
    });
    if (error) {
      setLoader({
        open: true,
        loading: false,
        success: false,
        error: "Business could not be saved, please try again latter",
      });
      return;
    }

    setLoader({
      open: true,
      loading: false,
      success: "Your business has been saved",
      error: false,
    });
  };

  return (
    <>
      <Grid container sx={{ padding: "8px" }}>
        {
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <Box p={1}>
                  <Divider textAlign="left">Essentials</Divider>
                </Box>
              </Grid>
              {items.map((item, _index) => {
                if (item.type === "text" || item.type === "number" || item.type === "email") {
                  return (
                    <Grid key={_index} item xs={12} sm={6} md={4}>
                      <Box p={1}>
                        <TextField
                          name={item.name}
                          label={item.label}
                          type={item.type}
                          variant="outlined"
                          sx={inputSx}
                          fullWidth
                          onChange={handleEssentialsChange}
                          value={essentials[item.name]}
                          name={item.name}
                        />
                      </Box>
                    </Grid>
                  );
                }
              })}
              <Grid item xs={12}>
                <Box p={1}>
                  <Divider textAlign="left">Specifications</Divider>
                </Box>
              </Grid>
              {items.map((item, _index) => {
                if (item.type === "select") {
                  return (
                    <Grid key={_index} item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }} p={1}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label" color="warning">
                            {item.label}
                          </InputLabel>
                          <Select
                            value={selects[item.name]}
                            variant="outlined"
                            label={item.label}
                            onChange={handleSelectChange}
                            name={item.name}
                            color="warning"
                          >
                            {item.values.map((value, _index) => (
                              <MenuItem key={_index} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  );
                }
              })}
              {items.map((item, _index) => {
                if (item.type === "datePicker") {
                  return (
                    <Grid key={_index} item xs={12} sm={6}>
                      <Box p={1}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label={item.label}
                            inputFormat="dd/MM/yyyy"
                            value={dates[item.name]}
                            onChange={(e) => handleDateChange(e, item.name)}
                            name={item.name}
                            color="warning"
                            renderInput={(params) => (
                              <TextField sx={{ inputSx }} fullWidth color="warning" name={item.name} {...params} />
                            )}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Grid>
                  );
                }
              })}
              <Grid item xs={12}>
                <Box p={1}>
                  <Divider textAlign="left">Valuation</Divider>
                </Box>
              </Grid>
              {items.map((item, _index) => {
                if (item.type === "currency") {
                  return (
                    <Grid key={_index} item xs={12} sm={6}>
                      <Box p={1}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="outlined-adornment-amount" color="warning">
                            {item.label}
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            value={currencies[item.name]}
                            onChange={(event) => {
                              if (+event.target.value != event.target.value) {
                                event.preventDefault();
                                return;
                              }
                              setCurrencies((prevCurrencies) => ({
                                ...prevCurrencies,
                                [item.name]: +event.target.value,
                              }));
                            }}
                            color="warning"
                            sx={{ inputSx }}
                            startAdornment={
                              <InputAdornment color="warning" position="start">
                                $
                              </InputAdornment>
                            }
                            label={item.label}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                  );
                }
              })}
              <Grid item xs={12}>
                <Box p={1}>
                  <Divider textAlign="left">Further notes</Divider>
                </Box>
              </Grid>
              {items.map((item, _index) => {
                if (item.type === "textArea") {
                  return (
                    <Grid key={_index} item xs={12}>
                      <Box p={1}>
                        <textarea
                          onChange={handleNotesChange}
                          value={notes[item.name]}
                          name={item.name}
                          placeholder={item.label}
                          style={{
                            width: "100%",
                            height: "100px",
                            border: "1px solid #D4AD36",
                            outline: "none",
                            borderRadius: "5px",
                            resize: "none",
                          }}
                        />
                      </Box>
                    </Grid>
                  );
                }
              })}
              <Grid item xs={12}>
                <Box p={1}>
                  <Divider textAlign="left">Location</Divider>
                </Box>
              </Grid>
              <Map />
            </Grid>
            <Grid item xs={12}>
              <Box p={1}>
                <Divider textAlign="left">Photos</Divider>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Box p={1}>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    *You can upload up to 10 images for your business by clicking the cloud icon
                  </Typography>
                </Box>
                <FileUploader multiple={10} handleFileChange={handleFileChange} files={files} setFiles={setFiles} />
              </Grid>
              <Grid item xs={12}>
                <Box p={1}>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    *Upload a single image that will serve as a main banner for your business
                  </Typography>
                </Box>
                <FileUploader handleFileChange={handleBannerChange} files={banner} setFiles={setBanner} />
              </Grid>
              <Grid item xs={12}>
                <Box p={3} sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="warning" type="submit">
                    Publish business
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        }
      </Grid>
      <Loader handleClose={handleClose} {...loader} />
    </>
  );
}
