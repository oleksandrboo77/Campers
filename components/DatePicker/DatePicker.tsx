"use client";

import { useEffect, useRef, useState } from "react";
import {
  addMonths,
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  isSameMonth,
  isSameDay,
} from "date-fns";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
  placeholder?: string;
}

function getCalendarWeeks(month: Date): Date[][] {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // понедельник

  const weeks: Date[][] = [];
  let current = gridStart;

  // делаем максимум 6 недель — как в обычных календарях
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(current);
      current = addDays(current, 1);
    }
    weeks.push(week);
    if (current > monthEnd && w >= 3) break;
  }

  return weeks;
}

export default function DatePicker({
  selected,
  onSelect,
  placeholder = "Booking date*",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(() => selected ?? new Date());
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectDay = (day: Date) => {
    onSelect(day);
    setMonth(day);
    setOpen(false);
  };

  const handlePrev = () => setMonth((prev) => addMonths(prev, -1));
  const handleNext = () => setMonth((prev) => addMonths(prev, 1));

  const weeks = getCalendarWeeks(month);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.input}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected ? format(selected, "MMMM d, yyyy") : placeholder}
      </button>

      {open && (
        <div className={styles.popover}>
          <div className={styles.arrow} />

          <div className={styles.calendar}>
            {/* шапка как в макете */}
            <div className={styles.header}>
              <button
                type="button"
                className={styles.navButton}
                onClick={handlePrev}
              >
                <span className={styles.navIcon}>
                  <svg className={styles.arrowIcon} aria-hidden="true">
                    <use href="/icons.svg#left_arrow_picker" />
                  </svg>
                </span>
              </button>

              <span className={styles.monthLabel}>
                {format(month, "LLLL yyyy")}
              </span>

              <button
                type="button"
                className={styles.navButton}
                onClick={handleNext}
              >
                <span className={styles.navIcon}>
                  <svg className={styles.arrowIcon} aria-hidden="true">
                    <use href="/icons.svg#right_arrow_picker" />
                  </svg>
                </span>
              </button>
            </div>

            <div className={styles.divider} />

            {/* Сетка */}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>MON</th>
                  <th>TUE</th>
                  <th>WED</th>
                  <th>THU</th>
                  <th>FRI</th>
                  <th>SAT</th>
                  <th>SUN</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, wi) => (
                  <tr key={wi}>
                    {week.map((day, di) => {
                      const outside = !isSameMonth(day, month);
                      const isSelected = selected && isSameDay(day, selected);

                      return (
                        <td key={di}>
                          <button
                            type="button"
                            className={[
                              styles.day,
                              outside ? styles.dayOutside : "",
                              isSelected ? styles.daySelected : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => handleSelectDay(day)}
                          >
                            {format(day, "d")}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
