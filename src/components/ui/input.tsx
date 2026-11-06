import React from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  ...props
}: InputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-base font-medium text-gray-700">
          {label}
        </Text>
      )}

      <TextInput
        className="h-15 rounded-xl border border-gray-300 bg-white px-4 text-base"
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {error && (
        <Text className="mt-1 text-sm text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
}