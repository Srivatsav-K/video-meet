"use client";

import { useTimeAndDate } from "@/hooks/useTimeAndDate";

const CurrentTimeAndDate = () => {
  const { time, date } = useTimeAndDate();
  return (
    <>
      <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
      <p className="text-sky-1 text-lg font-medium lg:text-2xl">{date}</p>
    </>
  );
};
export default CurrentTimeAndDate;
