function formatTimestamp(timestamp) {
  if (!timestamp) return "";

  // Parse the timestamp into a JavaScript Date object
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "";

  // Extract date components
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Pad minutes with leading zero
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  // Format the date as '23/11/2024, 03:12 PM'
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

export default formatTimestamp;
