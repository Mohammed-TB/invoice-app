import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

export default function Screen({ children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar 
                         // يجعل الأيقونات والوقت باللون الأبيض (استخدم "dark" للأيقونات السوداء)
        backgroundColor="#1a2556"      // اختر اللون الذي يناسب تطبيقك (مثلاً الأزرق الداكن)
        translucent={false}            // لمنع تداخل الشاشة مع شريط الحالة في أندرويد
      />
      {children}
    </SafeAreaView>
  );
}