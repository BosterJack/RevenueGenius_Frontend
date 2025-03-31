import React from "react";
import CustomToast from "./custom-toast";

interface StatusToastProps {
  status: "pending" | "error" | "success" | "idle";
  messages?: {
    pending?: string;
    error?: string;
    success?: string;
  };
  titles?: {
    pending?: string;
    error?: string;
    success?: string;
  };
  durations?: {
    pending?: number;
    error?: number;
    success?: number;
  };
}

const StatusToast: React.FC<StatusToastProps> = ({
  status,
  messages,
  titles,
  durations,
}) => {
  const toastProps = {
    pending: {
      type: "info",
      title: titles?.pending || "Processing...",
      message: messages?.pending || "Your request is being processed. Please wait.",
      duration: durations?.pending || 3000,
    },
    error: {
      type: "error",
      title: titles?.error || "An error occurred",
      message: messages?.error || "Something went wrong. Please try again.",
      duration: durations?.error || 5000,
    },
    success: {
      type: "success",
      title: titles?.success || "Action completed!",
      message: messages?.success || "Your operation was successful.",
      duration: durations?.success || 4000,
    },
    idle: null,
  };
//@ts-ignore
  return status !== "idle" ? <CustomToast {...toastProps[status]} /> : null;
};

export default StatusToast;
