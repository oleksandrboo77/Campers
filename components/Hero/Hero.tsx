import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog.
          </p>
          <Link href="/catalog">
            <button type="button" className={styles.button}>
              View Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
