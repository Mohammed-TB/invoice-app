import React from "react";
import { View } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <View className="flex-1 px-5 py-4 gap-2">
      {children}
    </View>
  );
}