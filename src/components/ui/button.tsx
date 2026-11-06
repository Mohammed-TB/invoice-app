import React from "react";
import {
  Pressable,
  PressableProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { LucideIcon } from "lucide-react-native"; // استيراد نوع الأيقونة

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = PressableProps & {
  title: string;
  loading?: boolean;
  variant?: ButtonVariant;
  icon?: LucideIcon; // 1. إضافة خاصية الأيقونة هنا كخاصية اختيارية
};

export default function Button({
  title,
  loading = false,
  disabled,
  variant = "primary",
  icon: Icon, // 2. تعيين الأيقونة بتبديل الحرف الأول لكبير لاستخدامها كمكون
  ...props
}: ButtonProps) {
  
  const isTargetDisabled = disabled || loading;

  const getVariantStyles = () => {
    if (isTargetDisabled) return "bg-gray-300 border-transparent";
    switch (variant) {
      case "secondary": return "bg-blue-50 active:bg-blue-100 border-transparent";
      case "outline": return "bg-transparent border-gray-600 active:bg-blue-50";
      case "primary":
      default: return "bg-blue-600 active:bg-blue-700 border-transparent";
    }
  };

  const getTextStyles = () => {
    if (isTargetDisabled) return "text-gray-500";
    switch (variant) {
      case "secondary":
      case "outline": return "black";
      case "primary":
      default: return "text-white";
    }
  };

  const getLoaderColor = () => {
    if (isTargetDisabled) return "#9ca3af";
    return variant === "primary" ? "white" : "#2563eb";
  };

  return (
    <Pressable
      disabled={isTargetDisabled}
      className={`h-11 px-5 flex-row items-center justify-center gap-2 rounded-xl border-2 ${getVariantStyles()}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getLoaderColor()} />
      ) : (
        <>
          {/* 3. رندرة الأيقونة بجانب النص إذا تم تمريرها */}
          {Icon && (
            <Icon 
              size={18} 
              color={variant === "primary" ? "white" : "black"} 
            />
          )}
          <Text className={`text-base font-semibold ${getTextStyles()}`}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}