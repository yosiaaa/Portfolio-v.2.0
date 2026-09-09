import { useEffect, useState } from "react";

export default function Timezone() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-carrara-800 font-medium text-base">
        Local Time <br />
        Jakarta, ID &ndash; {time}
      </p>
    </div>
  );
}
