import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Plus } from 'lucide-react-native';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // لون التبويب النشط
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false, // إظهار العنوان في الأعلى
      }}
    >
                  <Tabs.Screen
        name="index"
        options={{
          title: 'الفواتير',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

            <Tabs.Screen
        name="create"
        options={{
          title: ' إضافة فاتورة',
          tabBarIcon: ({ color, size }) => (
            <Plus size={size} color={color} />
          ),
        }}
      />




    </Tabs>
    
  );
}