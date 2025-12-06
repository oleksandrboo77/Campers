"use client";

import { useState } from "react";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  camperName: string;
}

export default function BookingForm({ camperName }: BookingFormProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(`Booking for ${camperName} was successful!`);
    setIsSending(false);
    event.currentTarget.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <input name="name" placeholder="Name" required className={styles.input} />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className={styles.input}
      />
      <input name="date" type="date" required className={styles.input} />
      <textarea
        name="comment"
        placeholder="Comment"
        className={styles.textarea}
      />

      <button type="submit" disabled={isSending} className={styles.button}>
        {isSending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
