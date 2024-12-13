import React from "react";
import dayjs, { Dayjs } from "dayjs";
import Day from "./Day";
import { daysOfWeek } from "./utils/consts";
import { IDays } from "./utils/types";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const Days: React.FC<IDays> = ({
  date,
  startDate,
  endDate,
  onClick,
  range,
}) => {
  const [hoveredDate, setHoveredDate] = React.useState<Dayjs | null>(null);
  
  console.log(3, startDate, endDate)
  
  // Убедимся, что неделя начинается с понедельника
  const firstDayOfMonth = date.startOf("month").day() === 0 ? 6 : date.startOf("month").day() - 1;
  const daysInMonth = date.daysInMonth();
  const previousMonth = date.subtract(1, "month");
  const previousMonthDays = previousMonth.daysInMonth();

  const days: React.ReactElement[] = [];
  const labels: React.ReactElement[] = [];

  // Создаем метки дней недели
  for (let i = 0; i < 7; i++) {
    labels.push(
      <span className="label" key={`label-${i}`}>
        {daysOfWeek[i]}
      </span>
    );
  }

  // Добавляем дни предыдущего месяца
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevDate = previousMonth.date(previousMonthDays - firstDayOfMonth + i + 1);
    days.push(
      <Day
        key={`prev-${prevDate.format("DD-MM-YYYY")}`}
        onClick={onClick}
        currentDate={date}
        date={prevDate}
        startDate={startDate}
        endDate={endDate}
        range={range}
        hoveredDate={hoveredDate}
        onMouseEnter={() => setHoveredDate(prevDate)}
        onMouseLeave={() => setHoveredDate(null)}
      />
    );
  }

  // Добавляем дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = date.date(i);
    days.push(
      <Day
        key={currentDate.format("DD-MM-YYYY")}
        onClick={onClick}
        currentDate={date}
        date={currentDate}
        startDate={startDate}
        endDate={endDate}
        range={range}
        hoveredDate={hoveredDate}
        onMouseEnter={() => setHoveredDate(currentDate)}
        onMouseLeave={() => setHoveredDate(null)}
      />
    );
  }

  // Добавляем дни следующего месяца, чтобы заполнить календарь
  const totalDaysDisplayed = days.length;
  for (let i = 1; i <= 42 - totalDaysDisplayed; i++) {
    const nextDate = date.add(1, "month").date(i);
    days.push(
      <Day
        key={`next-${nextDate.format("DD-MM-YYYY")}`}
        onClick={onClick}
        currentDate={date}
        date={nextDate}
        startDate={startDate}
        endDate={endDate}
        range={range}
        hoveredDate={hoveredDate}
        onMouseEnter={() => setHoveredDate(nextDate)}
        onMouseLeave={() => setHoveredDate(null)}
      />
    );
  }


  return <nav className="calendar--days">{[...labels, ...days]}</nav>;
};

export default Days;
