// components/ui/payment-status-selector.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface PaymentStatusSelectorProps {
  selectedStatus: "نقداً" | "آجل";
  onStatusChange: (status: "نقداً" | "آجل") => void;
}

export default function PaymentStatusSelector({
  selectedStatus = "نقداً",
  onStatusChange,
}: PaymentStatusSelectorProps) {
  return (
    <View className="gap-1">
      <Text className="font-bold text-gray-700 text-right">طريقة الدفع</Text>
      <View className="flex-row bg-gray-100 p-1 rounded-xl">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onStatusChange("نقداً")}
          className={`flex-1 py-2 rounded-lg items-center ${
            selectedStatus === "نقداً" ? "bg-green-600" : "bg-transparent"
          }`}
        >
          <Text
            className={`font-bold ${
              selectedStatus === "نقداً" ? "text-white" : "text-gray-600"
            }`}
          >
            نقداً
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onStatusChange("آجل")}
          className={`flex-1 py-2 rounded-lg items-center ${
            selectedStatus === "آجل" ? "bg-orange-500" : "bg-transparent"
          }`}
        >
          <Text
            className={`font-bold ${
              selectedStatus === "آجل" ? "text-white" : "text-gray-600"
            }`}
          >
            آجل
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}