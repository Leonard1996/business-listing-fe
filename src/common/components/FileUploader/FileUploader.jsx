import styles from "./FileUploader.module.scss";
import BackupIcon from "@mui/icons-material/Backup";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { v4 as uuidv4 } from "uuid";

export default function FileUploader({
  multiple,
  handleFileChange,
  files,
  setFiles,
  existingFiles,
  handleExistingFilesDelete,
  handleExistingBannerDelete,
}) {
  const uploadRef = React.useRef(null);
  const isMediumScreen = useMediaQuery("(max-width:850px)");
  const [isOpen, setIsOpen] = React.useState(false);
  const [source, setSource] = React.useState(null);

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  const handleImageView = (file) => {
    if (file.path) {
      setSource(process.env.REACT_APP_STATIC_SERVER + file.path);
      setIsOpen(true);
      return;
    }
    if (file.type && !file.type.startsWith("image/")) {
      // console.log("File is not an image.", file.type, file);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setSource(reader.result);
      setIsOpen(true);
    };

    reader.readAsDataURL(file);
  };

  const handleImageDelete = (file) => {
    setFiles((prevFiles) => prevFiles.filter((pf) => pf.lastModified !== file.lastModified));
  };

  return (
    <>
      <div className={styles["container"]}>
        <div>
          <div onClick={handleUploadClick}>
            <BackupIcon sx={{ transform: "scale(3.5)", fill: "#ccc", display: "block" }} />
            <input
              ref={uploadRef}
              type="file"
              hidden
              type="file"
              multiple={multiple ? "multiple" : null}
              accept="image/*"
              onChange={handleFileChange}
              disabled={
                (!multiple && (existingFiles?.length || files?.length)) ||
                (multiple && existingFiles?.length + files?.length > 9)
              }
            />
          </div>
        </div>
        <div className={styles["container--separator"]} />
        <div className={multiple ? styles["container__list"] : styles["container__single"]}>
          <List dense={true}>
            {existingFiles.map((file) => (
              <ListItem
                key={file.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                      onClick={
                        !file.isBanner ? () => handleExistingFilesDelete(file.id) : () => handleExistingBannerDelete()
                      }
                    />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageSearchIcon onClick={() => handleImageView(file)} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.originalName}
                  sx={{
                    width: isMediumScreen ? "100px" : "150px",
                  }}
                />
              </ListItem>
            ))}
            {files.map((file) => (
              <ListItem
                key={uuidv4()}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={() => handleImageDelete(file)} />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageSearchIcon onClick={() => handleImageView(file)} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.name}
                  sx={{
                    width: isMediumScreen ? "100px" : "150px",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      {isOpen && (
        <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
          {source && <img src={source} />}
        </Dialog>
      )}
    </>
  );
}
