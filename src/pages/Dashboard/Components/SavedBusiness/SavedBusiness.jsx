import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useHistory } from "react-router-dom";
import Modal from "../../../../common/components/Modal/Modal";
import { check, deleteBusiness, like } from "../../dashboard.service.js";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SavedBusiness({
  businessName,
  askingPrice,
  lastAnnualTurnover,
  lastAnnualProfit,
  industry,
  description,
  id,
  businessService,
  hidden,
  save,
}) {
  const heightRef = React.useRef(null);
  const checkLike = async () => {
    const [liked, error] = await check(id);
    if (!error) {
      if (liked?.data?.data?.businessId === id) setIsSaved(!liked?.data?.data?.deleted);
      return;
    }
  };
  useEffect(() => {
    checkLike();
    return () => clearInterval(timerId);
  }, []);

  const history = useHistory();
  const handleModalClose = () => setModal((prevState) => ({ ...prevState, isOpen: false }));
  const [isSaved, setIsSaved] = React.useState(false);

  const deleteService = async () => {
    setModal((prevState) => ({ ...prevState, pending: "Deleting...", disabled: true }));
    const [business, error] = await deleteBusiness(id);
    if (!error) {
      setModal((prevState) => ({ ...prevState, pending: "Deleted" }));
      timerId = setTimeout(() => {
        setModal((prevState) => ({ ...prevState, pending: null, disabled: false }));
      }, 2000);
    } else {
      setModal((prevState) => ({ ...prevState, pending: "Error" }));
      timerId = setTimeout(() => {
        setModal((prevState) => ({ ...prevState, pending: null, disabled: false }));
      }, 2000);
    }
    businessService();
  };

  const handleSave = async (id) => {
    const [liked, error] = await like(id);
    if (!error) {
      setIsSaved(!liked?.data?.data?.deleted);
      return;
    }
  };

  const [modal, setModal] = React.useState({
    isOpen: false,
    title: "Are you sure you want to delete this entry",
    text: 'By clicking "continue" you agree to permantly delete this entry, this action cannot be undone!',
    no: "Cancel",
    yes: "Continue",
    pending: null,
    handleClose: handleModalClose,
    callback: deleteService,
    disabled: false,
  });

  const handleDelete = () => {
    setModal((prevState) => ({ ...prevState, isOpen: true }));
  };

  let timerId;

  return (
    <>
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
          <Grid container spacing={1}>
            <Grid item xs={0}>
              <Typography
                ref={heightRef}
                variant="h6"
                sx={{ fontSize: "1rem" }}
                onClick={() => history.push("/businesses/" + id)}
              >
                {businessName ? businessName : "Name not available"}
              </Typography>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  webkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  fontSize: "0.7rem",
                  margin: 0,
                }}
              >
                {description ? description : "No description set for this entry"}
              </p>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                  Asking Price
                </Typography>

                <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                  {askingPrice && +askingPrice >= 0 ? "£ " + askingPrice : "N/A"}
                </Typography>
              </div>
              {/* TURNOVER */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption" component="span">
                  Turnover
                </Typography>

                <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                  {lastAnnualTurnover && +lastAnnualTurnover >= 0 ? "£ " + lastAnnualTurnover : "N/A"}
                </Typography>
              </div>
              {/* PROFIT */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption" component="span">
                  Net Profit
                </Typography>

                <Typography variant="caption" sx={{ fontWeight: "bold" }} component="span">
                  {lastAnnualProfit && +lastAnnualProfit >= 0 ? "£ " + lastAnnualProfit : "N/A"}
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
              <div>
                <Typography variant="caption" component="span" sx={{ fontWeight: "bold" }}></Typography>
              </div>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: "flex-end", display: "flex" }}>
              <div title="Edit" onClick={() => history.push("/dashboard/my-business/" + id)}>
                {!hidden && <ModeEditOutlineIcon />}
              </div>
              <div title="Delete">{!hidden && <DeleteForeverIcon onClick={handleDelete} />}</div>
              <div title="View">
                <RemoveRedEyeIcon onClick={() => history.push("/businesses/" + id)} />
              </div>
              <div title="Add to 'Save Search'">
                {save && <FavoriteIcon onClick={() => handleSave(id)} sx={{ fill: isSaved ? "red" : "#ccc" }} />}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal {...modal} />
    </>
  );
}
