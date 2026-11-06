import React, { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';
import { I18nManager,Platform } from 'react-native';
import { InvoiceProvider } from "@/features/invoice/context/invoice-provider";
// 1. إجبار التطبيق على القراءة من اليمين إلى اليسار
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);


export default function RootLayout() {
  useEffect(() => {
    // حل سحري خاص بالويب فقط!
    if (Platform.OS === 'web') {
      // نقوم بإجبار لغة الـ document في المتصفح على الاتجاه من اليمين إلى اليسار
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }, []);
  return (
    <InvoiceProvider>
          <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />


      <Stack.Screen name="invoice/preview" />

      
    </Stack>
    <Toast />
    </InvoiceProvider>

  );
}