export const formatTimestamp = (time) =>
  time.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) +
  " | " +
  time.toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
  });
