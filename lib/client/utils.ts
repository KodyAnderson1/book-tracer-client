"use client";
import { toast } from "react-toastify";

export const customToast = (
  message: string,
  color: "success" | "error" | "warning" | "info",
  autoClose?: number
) => {
  return toast(message, {
    type: color,
    position: "top-right",
    autoClose: autoClose || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export function formatDateString(dateString: string): string {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Define an array of month names
  const months = [
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

  // Extract the day, month, and year from the Date object
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Return the formatted date string
  return `${month} ${day}, ${year}`;
}

// Example usage
console.log(formatDateString("2023-10-08 15:18:19.636186")); // Output: Oct 8, 2023
