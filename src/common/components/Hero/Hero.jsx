import styles from "./Hero.module.scss";
import { useRouteMatch } from "react-router-dom";

export default function Hero({ src, children, homepageStyles }) {
  let match = useRouteMatch("/businesses/:businessId");
  const background = {
    backgroundImage: `url("${src}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    height: "500px",
    backgroundSize: "cover",
    width: "100vw",
    ...(match && { filter: "brightness(85%)" }),
  };
  return (
    <div className={styles["container"]} style={{ ...(src && background), ...(homepageStyles && homepageStyles) }}>
      {children}
    </div>
  );
}
