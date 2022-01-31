import React from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { Typography, Box } from "@mui/material";
import { AuthContext } from "../../../context/Auth/Auth";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

class LocationSearchModal extends React.PureComponent {
  static contextType = AuthContext;
  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 11,
    height: 400,
    mapPosition: {
      lat: 51.5072,
      lng: 0.1276,
    },
    markerPosition: {
      lat: 51.5072,
      lng: 0.1276,
    },
  };

  componentDidMount() {
    if (this.props.mapState) {
      this.setState(this.props.mapState);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.context.setMapState((prevState) => ({
          ...prevState,
          ...{
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
        }));
        this.setState(
          {
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
              (response) => {
                const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray);
                this.context.setMapState((prevState) => ({
                  ...prevState,
                  ...{
                    address: address ? address : "",
                    area: area ? area : "",
                    city: city ? city : "",
                    state: state ? state : "",
                  },
                }));
                this.setState({
                  address: address ? address : "",
                  area: area ? area : "",
                  city: city ? city : "",
                  state: state ? state : "",
                });
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }

  //   shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     if (
  //       this.state.markerPosition.lat !== this.state.center.lat ||
  //       this.state.address !== nextState.address ||
  //       this.state.city !== nextState.city ||
  //       this.state.area !== nextState.area ||
  //       this.state.state !== nextState.state
  //     ) {
  //       return true;
  //     } else if (this.state.mapPosition.lat === nextState.mapPosition.lat) {
  //       return false;
  //     }
  //   }

  getCity = (addressArray) => {
    if (!addressArray) return;
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "administrative_area_level_2" === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    if (!addressArray) return;
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ("sublocality_level_1" === addressArray[i].types[j] || "locality" === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    if (!addressArray) return;
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && "administrative_area_level_1" === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  onChange = (event) => {
    this.context.setMapState((prevState) => ({
      ...prevState,
      ...{ [event.target.name]: event.target.value },
    }));
    this.setState({ [event.target.name]: event.target.value });
  };

  onInfoWindowClose = (event) => {};

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.context.setMapState((prevState) => ({
          ...prevState,
          ...{
            address: address ? address : "",
            area: area ? area : "",
            city: city ? city : "",
            state: state ? state : "",
            markerPosition: {
              lat: newLat,
              lng: newLng,
            },
            mapPosition: {
              lat: newLat,
              lng: newLng,
            },
          },
        }));
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    const address = place.formatted_address;
    if (!address) return;
    const addressArray = place.address_components;
    const city = this.getCity(addressArray);
    const area = this.getArea(addressArray);
    const state = this.getState(addressArray);
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();
    this.context.setMapState((prevState) => ({
      ...prevState,
      ...{
        address: address ? address : "",
        area: area ? area : "",
        city: city ? city : "",
        state: state ? state : "",
        markerPosition: {
          lat: latValue,
          lng: lngValue,
        },
        mapPosition: {
          lat: latValue,
          lng: lngValue,
        },
      },
    }));
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  // const AsyncMap = compose(
  //     withProps({
  //         googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyALVjLwOIM1gf7EzdJJVmWLKdLP-yZGTcw&v=3.exp&libraries=geometry,drawing,places",
  //         loadingElement: <div style={{ height: `100%` }} />,
  //         containerElement: <div style={{ height: `400px` }} />,
  //         mapElement: <div style={{ height: `100%` }} />,
  //     }),
  //     withScriptjs,
  //     withGoogleMap
  // )((props) =>
  //     <GoogleMap

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={this.state.zoom}
          defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
        >
          <Marker
            google={this.props.google}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
          />
          <Marker />

          {/* <MarkerWithLabel
                            position={{ lat: -34.397, lng: 150.644 }}
                            labelAnchor={new google.maps.Point(0, 0)}
                            labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
                        >
                            <div>Hello There!</div>
                        </MarkerWithLabel> */}

          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              marginTop: "2px",
              marginBottom: "2rem",
            }}
            onPlaceSelected={this.onPlaceSelected}
            options={{
              types: ["geocode", "establishment"],
            }}
          />
        </GoogleMap>
      ))
    );

    return (
      <div style={{ width: "100%", height: "500px" }}>
        <Box p={1}>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            *Type the location in the box or drag and drop your marker
          </Typography>
        </Box>
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: this.state.height }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default LocationSearchModal;
