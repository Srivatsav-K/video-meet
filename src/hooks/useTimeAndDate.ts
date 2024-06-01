import { useState } from "react";
import { useInterval } from "usehooks-ts";

export const useTimeAndDate = (
  refereshIntervalMs = (60 - new Date().getSeconds()) * 1000,
) => {
  const [date, setDate] = useState(new Date());

  useInterval(
    () => {
      setDate(new Date());
    },
    // Delay in milliseconds or null to stop it
    refereshIntervalMs,
  );

  return {
    time: date.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: date.toLocaleDateString("en-us", {
      dateStyle: "full",
    }),
  };
};
