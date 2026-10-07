import styles from "./profileContent.module.css";

export default function ProfileContent({ children }) {
  return <div className={styles.profile_content}>{children}</div>;
}
