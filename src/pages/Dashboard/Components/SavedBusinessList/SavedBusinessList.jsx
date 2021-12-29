import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import SavedBusiness from "../SavedBusiness/SavedBusiness";
import { listBusinesses } from "../../dashboard.service";
import Pagination from "@mui/material/Pagination";

export default function SavedBusinessList({ hidden, isFilter, setFilterCount }) {
  const [businesses, setBusinesses] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const callBusinessesService = async (page) => {
    const [businesses, error] = await listBusinesses(page, isFilter);
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
    if (page) {
      callBusinessesService(page);
    }
  }, [page]);

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div style={isLoading ? loadingStyle : {}}>
      {isLoading ? (
        <CircularProgress color="warning" />
      ) : (
        <>
          <Box paddingTop={2}>
            <Pagination
              sx={{ display: "flex", justifyContent: "center" }}
              onChange={handlePageChange}
              count={count}
              color="warning"
            />
          </Box>
          <Grid container sx={{ padding: "0.5rem" }}>
            {businesses.map((business) => {
              const {
                id,
                path,
                name_of_business: businessName,
                asking_price: askingPrice,
                last_annual_turnover: lastAnnualTurnover,
                last_annual_profit: lastAnnualProfit,
                industry,
                description,
              } = business;

              return (
                <React.Fragment key={business.id}>
                  <Grid item xs={3} sx={5} xl={3} sx={{ marginTop: "0.5rem" }}>
                    {path ? (
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
                  <Grid item xs={9} sx={7} xl={9}>
                    <SavedBusiness
                      {...business}
                      askingPrice={askingPrice}
                      lastAnnualTurnover={lastAnnualTurnover}
                      lastAnnualProfit={lastAnnualProfit}
                      businessName={businessName}
                      businessService={() => callBusinessesService(page)}
                      hidden={hidden}
                    />
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
}
