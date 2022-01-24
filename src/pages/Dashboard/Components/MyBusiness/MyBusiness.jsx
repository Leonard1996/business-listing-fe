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
import React, { useState } from "react";
import Map from "../../../../common/components/Map/Map";
import FileUploader from "../../../../common/components/FileUploader/FileUploader";
import { createBusiness, deleteAttachment } from "../../dashboard.service";
import { AuthContext } from "../../../../context/Auth/Auth";
import Loader from "../../../../common/components/Loader/Loader";
import { items } from "../../../../common/config/fields";
import { useParams } from "react-router-dom";
import { getMyBusiness } from "../../../Business/business.service";
import { useEffect } from "react";

export default function MyBusiness(props) {
  const { businessId } = useParams();

  const fetchBusiness = async (id) => {
    if (businessId) {
      const [business, error] = await getMyBusiness(id);
      if (!error) {
        const newEssentials = {};
        const newSelects = {};
        const newDates = {};
        const newCurrencies = {};
        const newNotes = {};
        const newMapState = {};

        for (const key in essentials) {
          newEssentials[key] = business.data.data[key];
        }
        for (const key in selects) {
          newSelects[key] = business.data.data[key];
        }
        for (const key in dates) {
          newDates[key] = business.data.data[key];
        }
        for (const key in currencies) {
          newCurrencies[key] = business.data.data[key];
        }
        for (const key in notes) {
          newNotes[key] = business.data.data[key];
        }
        for (const key in mapState) {
          if (mapState[key] !== "object") {
            newMapState[key] = business.data.data[key];
          }
        }

        newMapState.markerPosition = {};
        newMapState.mapPosition = {};

        newMapState.markerPosition.lat = business.data.data.markerPositionLat;
        newMapState.markerPosition.lng = business.data.data.markerPositionLng;
        newMapState.mapPosition.lat = business.data.data.mapPositionLat;
        newMapState.mapPosition.lng = business.data.data.mapPositionLng;
        newMapState.height = 400;
        newMapState.zoom = 11;

        const newExistingBanner = [],
          newExistingFiles = [];
        business.data.data.attachments?.forEach((attachment) => {
          if (attachment.isBanner) newExistingBanner.push(attachment);
          else newExistingFiles.push(attachment);
        });
        setExistingBanner(newExistingBanner);
        setExistingFiles(newExistingFiles);

        setMapState(newMapState);
        setEssentials(newEssentials);
        setSelects(newSelects);
        setDates(newDates);
        setCurrencies(newCurrencies);
        setNotes(newNotes);
      }
    }
  };

  useEffect(() => {
    fetchBusiness(businessId);
  }, []);

  const [existingFiles, setExistingFiles] = React.useState([]);
  const [existingBanner, setExistingBanner] = React.useState([]);

  const [selects, setSelects] = React.useState({
    relocatable: "Yes",
    ownerManaged: "Yes",
    reasonForSelling: "Illness/Health",
    industry: "Agriculture, Horticulture & Marine",
  });

  const { mapState, setMapState } = React.useContext(AuthContext);

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
    // event.preventDefault();
    const isWithBanner = banner?.length ? true : false;
    setLoader({
      open: true,
      loading: businessId ? "Updating your business, please wait..." : "Saving your business, please wait...",
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
      businessId,
    });
    if (error) {
      setLoader({
        open: true,
        loading: false,
        success: false,
        error: businessId ? "Business could not be updated" : "Business could not be saved, please try again latter",
      });
      return;
    }

    setLoader({
      open: true,
      loading: false,
      success: businessId ? "You business has been updated" : "Your business has been saved",
      error: false,
    });
  };

  const handleExistingFilesDelete = async (id) => {
    const [result, error] = await deleteAttachment(id, businessId);
    if (!error) {
      const files = existingFiles.filter((file) => file.id !== id);
      setExistingFiles(files);
      return;
    }
    console.log(error);
  };

  const handleExistingBannerDelete = async () => {
    const [result, error] = await deleteAttachment(existingBanner[0].id, businessId);
    if (!error) {
      setExistingBanner([]);
      return;
    }
    console.log(error);
  };

  return (
    <>
      <Grid container sx={{ padding: "8px" }}>
        {
          <form style={{ width: "100%" }}>
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
              <Map mapState={mapState} />
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
                <FileUploader
                  multiple={10}
                  handleFileChange={handleFileChange}
                  files={files}
                  setFiles={setFiles}
                  existingFiles={existingFiles}
                  setExisitingFiles={setExistingFiles}
                  handleExistingFilesDelete={handleExistingFilesDelete}
                />
              </Grid>
              <Grid item xs={12}>
                <Box p={1}>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    *Upload a single image that will serve as a main banner for your business
                  </Typography>
                </Box>
                <FileUploader
                  handleFileChange={handleBannerChange}
                  files={banner}
                  setFiles={setBanner}
                  existingFiles={existingBanner}
                  setExistingFiles={setExistingBanner}
                  handleExistingBannerDelete={handleExistingBannerDelete}
                />
              </Grid>
              <Grid item xs={12}>
                <Box p={3} sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="warning" onClick={handleSubmit}>
                    {businessId ? "Update business" : "Publish business"}
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
