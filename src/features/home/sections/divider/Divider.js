import styles from "./divider.module.css";

export default function Divider({ data }) {
  return (
    <hr className={styles.space} style={{ color: data?.style?.color }}></hr>
  );
}
