import { useEffect, useState } from "react";

const USERNAME = "Thenathanb";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

const levelClasses = [
  "bg-white/[0.06]",
  "bg-accent/30",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const toWeeks = (days) => {
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(firstWeekday).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
};

const monthLabel = (week, index, weeks) => {
  const firstDay = week.find(Boolean);
  if (!firstDay) return "";
  const month = Number(firstDay.date.slice(5, 7)) - 1;
  if (index === 0) return monthNames[month];
  const previous = weeks[index - 1].find(Boolean);
  const previousMonth = Number(previous.date.slice(5, 7)) - 1;
  return month !== previousMonth ? monthNames[month] : "";
};

const formatDay = (day) => {
  const date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const noun = day.count === 1 ? "contribution" : "contributions";
  return `${day.count} ${noun} on ${date}`;
};

export default function GitHubActivity() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        if (!cancelled && json?.contributions?.length) {
          setData({
            weeks: toWeeks(json.contributions),
            total: json.total?.lastYear ?? 0,
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;

  return (
    <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          GitHub Activity
        </p>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-white/70 transition hover:text-white"
        >
          @{USERNAME} →
        </a>
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-[720px] flex-col gap-2">
          <div className="flex gap-[3px] text-xs text-white/40">
            {data.weeks.map((week, index) => (
              <span key={index} className="w-0 flex-1 whitespace-nowrap">
                {monthLabel(week, index, data.weeks)}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {data.weeks.map((week, index) => (
              <div key={index} className="flex w-0 flex-1 flex-col gap-[3px]">
                {week.map((day, dayIndex) =>
                  day ? (
                    <span
                      key={day.date}
                      title={formatDay(day)}
                      className={`aspect-square w-full rounded-[3px] ${levelClasses[day.level]}`}
                    />
                  ) : (
                    <span key={dayIndex} className="aspect-square w-full" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
        <span>{data.total.toLocaleString()} contributions in the last year</span>
        <span className="flex items-center gap-[3px]">
          <span className="mr-2">Less</span>
          {levelClasses.map((levelClass) => (
            <span
              key={levelClass}
              className={`h-3 w-3 rounded-[3px] ${levelClass}`}
            />
          ))}
          <span className="ml-2">More</span>
        </span>
      </div>
    </div>
  );
}
