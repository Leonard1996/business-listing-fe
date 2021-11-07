import styles from "./Hero.module.scss";

export default function Hero({ src }) {
  const background = `lightblue url(${src}) no-repeat fixed center`;
  return <div className={styles["container"]} styles={{ backgrounds: src ? background : null }}></div>;
}
