import { Card, CardContent, Typography } from "@mui/material";

export default function SimilarBusiness({ title, askingPrice, city, id }) {
  const handleClick = () => {
    window.open(`/${"businesses" + "/" + id}`, "_self");
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: "90%",
        height: "150px",
        backgroundColor: "#F6F6F7",
        display: "flex",
        margin: "32px auto",
        cursor: "pointer",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <Typography variant="body1" sx={{ color: "#D4AE36" }}>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              webkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              fontSize: "1rem",
              margin: 0,
            }}
          >
            {title}
          </span>
        </Typography>
        <Typography variant="body2">{city}</Typography>
        <Typography variant="body2">Asking Price: {askingPrice}</Typography>
      </CardContent>
    </Card>
  );
}
