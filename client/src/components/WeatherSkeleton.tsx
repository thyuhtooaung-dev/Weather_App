import { Skeleton } from "@/components/ui/skeleton";
import { BouncingDots } from "@/components/ui/loader";

export const TodayCardSkeleton = () => {
  return (
    <div className="bg-neutral-800 p-6 rounded-3xl h-full flex flex-col lg:flex-row justify-between min-h-68 animate-pulse">
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 bg-neutral-700" />
        <Skeleton className="h-4 w-1/2 bg-neutral-700" />
      </div>

      <div className="flex flex-col items-center justify-center grow gap-4">
        <div className="h-20 flex items-center">
          <BouncingDots />
        </div>
        <p className="text-neutral-400 font-medium">Loading...</p>
      </div>
    </div>
  );
};

const detailCardStyle =
  "bg-neutral-800 py-3 px-5 flex flex-col gap-6 rounded-lg";

export const TodayDetailSkeleton = () => {
  const details = [
    "Feels Like",
    "Humidity",
    "Wind",
    "Precipitation",
    "Pressure",
    "Visibility",
    "Max UV Index",
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {details.map((title) => (
        <div key={title} className={detailCardStyle}>
          <p className="text-neutral-400 text-sm">{title}</p>
          <span className="text-neutral-200 text-2xl font-bold animate-pulse">
            -
          </span>
        </div>
      ))}
    </div>
  );
};

export const DailyForecastSkeleton = () => {
  return (
    <div>
      <header className="text-neutral-0 my-4 text-xl font-semibold">
        Daily forecast
      </header>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="bg-neutral-800 p-2 rounded-xl flex flex-col gap-4 min-h-44"
          >
            <Skeleton className="h-4 w-8 mx-auto bg-neutral-700" />
            <Skeleton className="size-20 rounded-full mx-auto bg-neutral-700" />
            <div className="flex justify-between items-center px-1">
              <Skeleton className="h-4 w-6 bg-neutral-700" />
              <Skeleton className="h-4 w-6 bg-neutral-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HourlyForecastSkeleton = () => {
  return (
    <div className="bg-neutral-800 p-4 rounded-xl">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-neutral-0">
          Hourly forecast
        </h2>
        <div className="h-8 w-32 bg-neutral-600 rounded px-4 py-3 flex items-center justify-between opacity-50">
          <div className="h-4 w-16 bg-neutral-500 rounded animate-pulse" />
          <div className="h-4 w-4 bg-neutral-500 rounded-full animate-pulse" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 pb-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-neutral-700 p-3 rounded-md"
          >
            <div className="flex gap-4 items-center">
              <Skeleton className="size-10 rounded-full bg-neutral-600" />
              <Skeleton className="h-5 w-16 bg-neutral-600" />
            </div>
            <Skeleton className="h-5 w-10 bg-neutral-600" />
          </div>
        ))}
      </div>
    </div>
  );
};
