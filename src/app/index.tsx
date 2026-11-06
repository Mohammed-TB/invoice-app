
import { Redirect } from 'expo-router';
import React from 'react';


export default function Index() {
  // توجيه المستخدم تلقائياً إلى صفحة التبويبات السفلى عند تشغيل التطبيق
  return <Redirect href="/(tabs)" />;

}