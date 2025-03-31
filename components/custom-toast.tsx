import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomToastProps {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const iconMap = {
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  error: <XCircle className="h-5 w-5 text-red-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
};

const bgColorMap = {
  success: "bg-green-500 text-white",
  error: "bg-red-500  text-white ",
  warning: "bg-yellow-500   text-white",
  info: "bg-blue-500  text-white",
};

export default function CustomToast({
  type = "info",
  title,
  message,
  duration = 4000,
  onClose,
}: CustomToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.5, ease: [0.17, 0.67, 0.83, 0.67] }}
          className="fixed bottom-5 right-5 z-50"
        >
          <Alert className={`p-4 rounded-lg shadow-xl flex items-center space-x-3 ${bgColorMap[type]}`}>
            {/* {iconMap[type]} */}
            <div className="flex-1 pb-2 py-2">
              <AlertTitle className="font-semibold">{title}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </div>
            {/* <button onClick={() => setVisible(false)} className="text-gray-600 hover:text-gray-800">
              <X className="h-4 w-4" />
            </button> */}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
