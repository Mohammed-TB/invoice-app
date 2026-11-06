import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type CurrencyType = "SAR" | "YER";

type CurrencySelectorProps = {
  selectedCurrency: CurrencyType;
  onCurrencyChange: (currency: CurrencyType) => void;
};

export default function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
}: CurrencySelectorProps) {
  return (
    <View className="flex-row items-center justify-between py-2">
      {/* عنوان جانبي صغير */}
      <Text className="font-bold text-gray-700">العملة:</Text>
      
      <View className="flex-row gap-5">
        {/* خيار الريال السعودي */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onCurrencyChange("SAR")}
          className="flex-row items-center gap-2"
        >
          {/* الدائرة الخارجية والداخلية */}
          <View className={`w-5 h-5 rounded-full border items-center justify-center ${
            selectedCurrency === "SAR" ? "border-blue-600" : "border-gray-300"
          }`}>
            {selectedCurrency === "SAR" && (
              <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            )}
          </View>
          <Text className="text-gray-700 font-medium">🇸🇦 ريال سعودي</Text>
        </TouchableOpacity>

        {/* خيار الريال اليمني */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onCurrencyChange("YER")}
          className="flex-row items-center gap-2"
        >
          {/* الدائرة الخارجية والداخلية */}
          <View className={`w-5 h-5 rounded-full border items-center justify-center ${
            selectedCurrency === "YER" ? "border-blue-600" : "border-gray-300"
          }`}>
            {selectedCurrency === "YER" && (
              <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            )}
          </View>
          <Text className="text-gray-700 font-medium">🇾🇪 ريال يمني</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}