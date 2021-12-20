import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";

export default function SavedBusiness({
  businessName,
  askingPrice,
  lastAnnualTurnover,
  lastAnnualProfit,
  industry,
  description,
  id,
}) {
  const heightRef = React.useRef(null);
  const [marginTop, setMarginTop] = React.useState("0px");
  useEffect(() => {
    if (heightRef) setMarginTop(heightRef.current.offsetHeight + 12.8 + "px");
  }, []);

  return (
    <Card
      sx={{
        height: "200px",
        marginTop: "0.5rem",
        borderRadius: "0px",
        ":hover": { backgroundColor: "#eee", cursor: "pointer", border: "1px solid #aaa", borderLeft: "none" },
      }}
      elevation={0}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography ref={heightRef} variant="h6">
              {businessName ? businessName : "Name not available"}
            </Typography>
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                webkitLineClamp: "6",
                webkitBoxOrient: "vertical",
                fontSize: "0.8rem",
              }}
            >
              {description ? description : "No description set for this entry"}
            </p>
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop }}>
              <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                Asking Price
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                ${askingPrice}
              </Typography>
            </div>
            {/* TURNOVER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" component="span">
                Turnover
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                ${lastAnnualTurnover}
              </Typography>
            </div>
            {/* PROFIT */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" component="span">
                Net Profit
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                ${lastAnnualProfit}
              </Typography>
            </div>
            {/* INDUSTRY TYPE */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" component="span">
                Industry
              </Typography>

              <Typography variant="caption" component="span">
                {industry?.length > 10 ? industry.slice(0, 9) + "..." : industry}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
