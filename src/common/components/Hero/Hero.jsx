import styles from "./Hero.module.scss";

export default function Hero({ src }) {
  const background = {
    backgroundImage: `url("${src}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    height: "500px",
    backgroundSize: "cover",
  };
  return <div className={styles["container"]} style={{ ...(src && background) }}></div>;
}
