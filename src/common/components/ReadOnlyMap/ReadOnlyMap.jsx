import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@mui/icons-material/Room";

export default function ReadOnlyMap({ lat, lng }) {
  return (
    <div style={{ height: "200px", width: "100%" }}>
      {lat && lng ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{ lat, lng }}
          defaultZoom={11}
        >
          <RoomIcon sx={{ fill: "red", transform: "scale(1.4)" }} lat={lat} lng={lng} />
        </GoogleMapReact>
      ) : null}
    </div>
  );
}
