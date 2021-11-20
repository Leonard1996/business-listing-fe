import { Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./ActivateAccount.module.scss";
import { verify } from "./activateAccount.service";

export default function ActivateAccount(props) {
  const [seconds, setSeconds] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const successMessage = "Account activated! You will be redirected in ";
  const errorMessage = "Could not activate account! You will be redirected in ";
  const [description, setDescription] = useState(successMessage);
  let decreaseSeconds;

  const verifyAccount = async () => {
    const [response, error] = await verify(props.match.params.token);
    if (error) {
      setDescription(errorMessage);
    }
    setIsLoading(false);
    decreaseSeconds = setInterval(() => {
      setSeconds((prevSeconds) => --prevSeconds);
    }, 1000);
  };

  useEffect(() => {
    verifyAccount();
    return () => {
      clearInterval(decreaseSeconds);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      props.history.push("/signin");
    }
  }, [seconds]);

  return (
    <div className={styles["container"]}>
      {isLoading ? (
        <CircularProgress color="warning" />
      ) : (
        <Typography variant="h6">{description + seconds + " seconds"}</Typography>
      )}
    </div>
  );
}
