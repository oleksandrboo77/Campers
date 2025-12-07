"use client";

import { useState } from "react";
import styles from "./BookingForm.module.css";
import DatePicker from "../DatePicker/DatePicker";

interface BookingFormProps {
  camperName: string;
}

export default function BookingForm({ camperName }: BookingFormProps) {
  const [isSending, setIsSending] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const comment = (formData.get("comment") as string) || "";

    if (!name || !email || !date) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(
      `Booking for ${camperName} on ${date.toLocaleDateString()} was successful!`
    );

    setIsSending(false);
    form.reset();
    setDate(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h3 className={styles.title}>Book your campervan now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <input
            name="name"
            type="text"
            placeholder="Name*"
            required
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          <input
            name="email"
            type="email"
            placeholder="Email*"
            required
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          <DatePicker
            placeholder="Booking date*"
            selected={date}
            onSelect={setDate}
          />
        </label>

        <label className={styles.field}>
          <textarea
            name="comment"
            placeholder="Comment"
            rows={4}
            className={`${styles.input} ${styles.textarea}`}
          />
        </label>
      </div>

      <button type="submit" className={styles.submit} disabled={isSending}>
        {isSending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
