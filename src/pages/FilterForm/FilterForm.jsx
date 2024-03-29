import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  Checkbox,
  FormLabel,
} from "@mui/material";
import React from "react";
import { items } from "../../common/config/fields";
import RoleBasedInput from "../../common/components/RoleBasedInput/RoleBasedInput";
import { inputSx } from "../Authenticate/Authenticate";
import styles from "../Authenticate/Authenticate.module.scss";
import useForm from "../../hooks/useForm";
import SavedBusinessList from "../Dashboard/components/SavedBusinessList/SavedBusinessList";

export default function FilterForm() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [count, setCount] = React.useState(0);
  const [state, handleChange] = useForm();
  const [checkboxes, setCheckboxes] = React.useState([false, false, false, false]);
  const dateLabels = ["Anytime", "New To Market", "Last 6 Months", "Last 12 Months"];
  const dateValues = [99999999, 32, 193, 385];
  const [isWithFilter, setIsWithFilter] = React.useState(0);
  const [filterParams, setFilterParams] = React.useState({});

  const handleCheckChange = (index) => {
    const newCheckboxes = new Array(4).fill(false);
    newCheckboxes[index] = true;
    setCheckboxes(newCheckboxes);
  };

  const handleSubmit = (event) => {
    window.scrollTo(0, 0);
    event.preventDefault();
    const tsCreated = checkboxes.findIndex((label) => label);
    setFilterParams({ ...state, ...(tsCreated > -1 && { tsCreated: dateValues[tsCreated] }) });
    setIsWithFilter((prevCount) => prevCount + 1);
  };

  return (
    <Grid container sx={{ minheight: "100vh", marginTop: "150px" }}>
      <Grid item xs={12} md={8} sx={{ backgroundColor: "#DDDDDD" }}>
        <Box p={3}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" sx={{ fontWeight: "800" }}>
                Businesses For Sale
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
              <Typography variant="h5" sx={{ fontWeight: "800", color: "#D5B552" }} display="inline">
                {count}
              </Typography>
              <Box sx={{ display: "inline", marginLeft: "0.5rem" }}>
                <Typography variant="h5" display="inline">
                  Available
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body2" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
                We understand that it’s an exciting prospect to buy a business. The idea of being your own boss can be
                an appealing career move. That’s why we’ve ensured we have the best businesses for sale across the UK.
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
                No matter what type of business you’re looking for, we’ll have one. Want to buy an online business, a
                small business, or a high street business? Bizdaq will find the perfect business for you.
              </Typography>
              <Typography variant="body2">
                We have a range of opportunities to suit your pocket, from start-ups to long es- tablished businesses
                and everything in between.
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "2rem", marginTop: "1rem" }}>
                Interested? Browse our business listings and see what businesses are for sale now.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12}>
          <Box p={isSmallScreen ? 0 : 3}>
            <SavedBusinessList
              hidden={true}
              isFilter={true}
              setFilterCount={setCount}
              isWithFilter={isWithFilter}
              filterParams={filterParams}
              save={true}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Box p={3}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5" sx={{ fontWeight: "800" }}>
                    Refine
                  </Typography>
                  <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => setIsWithFilter(0)}>
                    Reset
                  </Typography>
                </div>
              </Box>
              <Grid item xs={12}>
                <RoleBasedInput all={true}>
                  <Box m={2}>
                    <TextField
                      label="Location"
                      type={"text"}
                      name="location"
                      fullWidth
                      sx={inputSx}
                      variant="standard"
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </Box>
                </RoleBasedInput>
              </Grid>
            </Grid>
            {items.map((item, key) => {
              if (item.type === "text" || item.type === "number" || item.type === "currency")
                return (
                  <Grid item xs={12} key={key}>
                    <RoleBasedInput mode="filter" {...item}>
                      <Box m={2}>
                        <TextField
                          label={item.type === "currency" ? item.label + " (up to) " : item.label}
                          type={item.type === "currency" ? "number" : item.type}
                          fullWidth
                          sx={inputSx}
                          variant="standard"
                          name={item.name}
                          onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                      </Box>
                    </RoleBasedInput>
                  </Grid>
                );
              if (item.type === "select")
                return (
                  <Grid item xs={12} key={key}>
                    <RoleBasedInput mode="filter" {...item}>
                      <Box sx={{ minWidth: 120 }} m={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label" color="warning">
                            {item.label}
                          </InputLabel>
                          <Select
                            variant="standard"
                            label={item.label}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            name={item.name}
                            color="warning"
                            value={state[item.name] || ""}
                          >
                            {item.values.map((value, _index) => (
                              <MenuItem key={_index} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </RoleBasedInput>
                  </Grid>
                );
              if (item.label === "Date added")
                return (
                  <Grid item xs={12} key={key}>
                    <RoleBasedInput mode="filter" {...item}>
                      <Box m={2}>
                        <FormLabel>
                          Listing Date
                          {checkboxes.map((checkbox, _index) => (
                            <div key={_index}>
                              <Checkbox
                                value={checkbox}
                                onChange={() => handleCheckChange(_index)}
                                checked={checkbox}
                                sx={{
                                  color: "#D4AE36",
                                  "&.Mui-checked": {
                                    color: "#D4AE36",
                                  },
                                }}
                              />
                              {dateLabels[_index]}
                            </div>
                          ))}
                        </FormLabel>
                      </Box>
                    </RoleBasedInput>
                  </Grid>
                );
            })}
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }} m={2}>
                <Button type="submit" variant="contained" className={styles["card__button"]}>
                  <Typography variant="caption">Search</Typography>
                </Button>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
