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
