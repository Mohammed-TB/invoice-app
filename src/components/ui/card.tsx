import React from "react";
import { View } from "react-native";


type CardProps = {
  children: React.ReactNode; 
};

export default function Card({ children }: CardProps) {
  return (
    <View className="bg-card p-5 rounded-2xl border border-gray-200"> 
      {children} 
    </View>
  );
}