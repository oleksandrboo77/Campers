import styles from "./FeedbackList.module.css";
import type { Review } from "../../lib/types";

interface FeedbackListProps {
  reviews: Review[];
}

export default function FeedbackList({ reviews }: FeedbackListProps) {
  if (!reviews.length) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <div className={styles.feedback}>
      {reviews.map((review) => (
        <article key={review.comment} className={styles.item}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className={styles.name}>{review.reviewer_name}</p>
              <p className={styles.stars}>
                {"★".repeat(review.reviewer_rating)}
                {"☆".repeat(5 - review.reviewer_rating)}
              </p>
            </div>
          </div>
          <p className={styles.text}>{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
