const formatDate = (date: string | Date) => {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString("en-GB"); // or your preferred format
};

export default formatDate;