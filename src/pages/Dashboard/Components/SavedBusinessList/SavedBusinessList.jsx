import React, { useEffect } from "react";
import { Grid, CircularProgress, Box, Tab, Tabs } from "@mui/material";
import { listBusinesses } from "../../dashboard.service";
import Pagination from "@mui/material/Pagination";
import ReadOnlyMap from "../../../../common/components/ReadOnlyMap/ReadOnlyMap";
import { useLocation } from "react-router-dom";
import SavedBusiness from "../SavedBusiness/SavedBusiness";
import { AuthContext } from "../../../../context/Auth/Auth";

export default function SavedBusinessList({ hidden, isFilter, setFilterCount, isWithFilter, filterParams, save }) {
  const [businesses, setBusinesses] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [pageView, setPageView] = React.useState(1);
  const [pageFilter, setPageFilter] = React.useState(1);
  const location = useLocation();

  const { accessToken } = React.useContext(AuthContext);

  const filterCount = React.useRef(0);

  const [isLoading, setIsLoading] = React.useState(true);

  const callBusinessesService = async (page, isWithFilter, isSaved) => {
    const [businesses, error] = await listBusinesses(page, isFilter, isWithFilter, filterParams, isSaved);
    if (error) {
      setIsLoading(false);
      return;
    }
    const {
      data: {
        data: {
          page: pages,
          pagination: { total_count, limit },
        },
      },
    } = businesses;
    setBusinesses(pages);
    setCount(Math.ceil(total_count / limit));
    setIsLoading(false);
    if (setFilterCount) setFilterCount(total_count);
  };

  React.useEffect(() => {
    if (page && !isWithFilter && view !== 3) {
      filterCount.current = isWithFilter;
      setPageFilter(1);
      callBusinessesService(page, false);
    }
  }, [page, isWithFilter]);

  React.useEffect(() => {
    if (isWithFilter && (filterCount.current < isWithFilter || pageFilter) && view !== 3) {
      filterCount.current = isWithFilter;
      setPage(1);
      callBusinessesService(pageFilter, true);
    }
  }, [pageFilter, isWithFilter]);

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  const handlePageChange = (event, value) => {
    if (view === 3) setPageView(value);
    if (isWithFilter) {
      setPageFilter(value);
    } else {
      setPage(value);
    }
  };

  const [view, setView] = React.useState(0);
  const tabs = accessToken ? ["List", "Grid", "Map", "Save Search"] : ["List", "Grid", "Map"];

  const handleTabChange = (event, newValue) => {
    setView(newValue);
  };

  useEffect(() => {
    if (view === 3) {
      setPage(1);
      setPageFilter(1);
      callBusinessesService();
      callBusinessesService(pageView, true, true);
    }
    if (view !== 3) {
      setPageView(1);
      setPageFilter(1);
      setPage(1);
      callBusinessesService(1, true, false);
    }
  }, [view, pageView]);

  return (
    <>
      {location.pathname === "/buy-businesses" ? (
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={view}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { background: "#CFAA43" } }}
            textColor="secondary"
          >
            {tabs.map((tab, _index) => (
              <Tab label={tab} key={_index} sx={{ fontWeight: _index === view ? "bold" : "normal" }} />
            ))}
          </Tabs>
        </Box>
      ) : null}

      <div style={isLoading ? loadingStyle : {}}>
        {isLoading ? (
          <CircularProgress color="warning" />
        ) : (
          <>
            <Box paddingTop={2}>
              {businesses?.length ? (
                <Pagination
                  sx={{ display: "flex", justifyContent: "center" }}
                  onChange={handlePageChange}
                  count={count}
                  color="warning"
                  page={isWithFilter ? pageFilter : page}
                />
              ) : (
                <div style={{ color: "red" }}>No businesses to display</div>
              )}
            </Box>
            {(view === 0 || view === 1 || view === 2 || view === 3) && (
              <Grid container sx={{ padding: "0.5rem" }}>
                {businesses.map((business) => {
                  const {
                    id,
                    path,
                    name_of_business: businessName,
                    asking_price: askingPrice,
                    last_annual_turnover: lastAnnualTurnover,
                    last_annual_profit: lastAnnualProfit,
                    map_position_lat: lat,
                    map_position_lng: lng,
                  } = business;
                  return (
                    <React.Fragment key={id}>
                      <Grid item xs={3} sx={{ marginTop: "0.5rem" }}>
                        {view === 2 ? (
                          <ReadOnlyMap lat={lat} lng={lng} />
                        ) : path ? (
                          <div
                            style={{
                              backgroundImage: `url("${process.env.REACT_APP_STATIC_SERVER + path}")`,
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundAttachment: "scroll",
                              height: "200px",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        ) : (
                          <div
                            style={{
                              backgroundColor: "#aaa",
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <p style={{ transform: "rotate(-45deg)", color: "#ccc", textAlign: "center" }}>
                              no image available
                            </p>
                          </div>
                        )}
                      </Grid>
                      <Grid item xs={9} md={view === 1 ? 3 : 9}>
                        <SavedBusiness
                          {...business}
                          askingPrice={askingPrice}
                          lastAnnualTurnover={lastAnnualTurnover}
                          lastAnnualProfit={lastAnnualProfit}
                          businessName={businessName}
                          businessService={() => callBusinessesService(page)}
                          hidden={hidden}
                          save={save}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </div>
    </>
  );
}
