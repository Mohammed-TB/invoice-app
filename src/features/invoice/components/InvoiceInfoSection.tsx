import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import CurrencySelector from "@/components/ui/currency-selector";
import PaymentStatusSelector from "@/components/ui/payment-status-selector"; // 1. استيراد المكون
import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useInvoice } from "../hooks/use-invoice"; 

export default function InvoiceInfoSection() {
  // 2. جلب setStatus من الـ Hook
  const { currentInvoice, customersList, setCustomerName, setCurrency, setStatus } = useInvoice();
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCustomers = customersList.filter((customer) =>
    customer.name.toLowerCase().includes(currentInvoice.customerName.toLowerCase())
  );

  return (
    <Card>
      <View className="items-center mb-5 border-b border-gray-100 pb-3">
        <Text className="font-bold text-lg text-gray-800">بيانات الفاتورة</Text>
      </View>
      
      <View className="gap-4 z-50"> 
        {/* اختيار العملة */}
        <CurrencySelector 
          selectedCurrency={currentInvoice.currency} 
          onCurrencyChange={setCurrency} 
        />

        {/* 3. إضافة اختيار حالة الدفع (نقداً / آجل) */}
        <PaymentStatusSelector
          selectedStatus={currentInvoice.status}
          onStatusChange={setStatus}
        />

        {/* حقل اسم العميل */}
        <View className="gap-1 relative">
          <Text className="font-bold text-gray-700 text-right">اسم العميل</Text>
          <Input 
            value={currentInvoice.customerName}
            onChangeText={(text) => {
              setCustomerName(text);
              setShowDropdown(true); 
            }}
            onFocus={() => setShowDropdown(true)} 
            placeholder="أدخل اسم العميل كاملاً"
          />

          {showDropdown && currentInvoice.customerName.trim().length > 0 && filteredCustomers.length > 0 && (
            <View className="absolute top-[75px] left-0 right-0 border border-gray-200 bg-white max-h-40 rounded-lg shadow-lg overflow-hidden z-50">
              <FlatList
                data={filteredCustomers}
                keyExtractor={(item) => item.id.toString()}
                nestedScrollEnabled={true} 
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-3 border-b border-gray-100 bg-white active:bg-gray-50"
                    onPress={() => {
                      setCustomerName(item.name); 
                      setShowDropdown(false); 
                    }}
                  >
                    <Text className="text-right text-gray-800 font-medium">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </Card>
  );
}