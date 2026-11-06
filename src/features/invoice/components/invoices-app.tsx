import React, { useState, useMemo } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import { useInvoice } from "../hooks/use-invoice";
import Screen from "@/components/layout/screen";
import AppHeader from "@/components/layout/app-header";
import Page from "@/components/layout/page-container";
import Card from "@/components/ui/card";
import { useRouter } from "expo-router";

export default function InvoicesApp() {
  const { invoicesList = [], setCurrentInvoice } = useInvoice();
  const router = useRouter();

  // 1. حالة لتخزين نص البحث
  const [searchQuery, setSearchQuery] = useState("");

  // 2. تصفية القائمة بحسب رقم الفاتورة أو اسم العميل
  const filteredInvoices = useMemo(() => {
    if (!searchQuery.trim()) return invoicesList;
    
    const query = searchQuery.trim().toLowerCase();
    return invoicesList.filter((invoice: any) => {
      const invoiceNumber = invoice.invoiceNumber?.toString().toLowerCase() || "";
      const customerName = invoice.customerName?.toLowerCase() || "";
      
      return invoiceNumber.includes(query) || customerName.includes(query);
    });
  }, [invoicesList, searchQuery]);

  const handleInvoicePress = (invoice: any) => {
    try {
      if (!invoice) return;

      if (setCurrentInvoice) {
        setCurrentInvoice(invoice);
      }

      const invoiceDataString = JSON.stringify(invoice);
      router.push({
        pathname: "/invoice/preview",
        params: { invoiceData: invoiceDataString }
      });
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("خطأ", "تعذر فتح تفاصيل هذه الفاتورة");
    }
  };

  const formatTotal = (total: any) => {
    const num = Number(total);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <Screen>
      <AppHeader title="الفواتير المحفوظة" showBack={false} showSettingsIcon={true} />

      <Page>
        <View className="mb-4">
          <Text className="text-xl font-bold text-gray-800 text-right mb-3">
            سجل الفواتير الصادرة
          </Text>

          {/* 3. حقل البحث برقم الفاتورة */}
          <View className="bg-gray-100 rounded-xl px-4 py-2 flex-row items-center justify-between border border-gray-200">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="ابحث برقم الفاتورة أو اسم العميل..."
              placeholderTextColor="#9ca3af"
              keyboardType="default"
              className="flex-1 text-right text-gray-800 text-base py-1"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} className="mr-2">
                <Text className="text-gray-400 font-bold px-1">✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {filteredInvoices.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-base font-medium">
              {searchQuery.trim()
                ? "لا توجد نتائج تطابق رقم الفاتورة المدخل"
                : "لا توجد فواتير مسجلة في الدفتر بعد"}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredInvoices}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleInvoicePress(item)}
                className="mb-3"
              >
                <Card>
                  <View className="flex-row justify-between items-center py-1">
                    {/* الجانب الأيمن: رقم الفاتورة واسم العميل */}
                    <View className="items-start">
                      <Text className="font-bold text-gray-950 text-base mb-1">
                        {item.customerName || "عميل نقدي"}
                      </Text>
                      <Text className="text-xs text-gray-400">
                        رقم الفاتورة: {item.invoiceNumber || "غير محدد"}
                      </Text>
                    </View>

                    {/* الجانب الأيسر: الإجمالي والحالة */}
                    <View className="items-start">
                      <Text className="font-bold text-blue-700 text-lg">
                        {formatTotal(item.total)} {item.currency === 'YER' ? 'ر.ي' : 'ر.س'}
                      </Text>
                      <View className={`mt-1 px-2 py-0.5 rounded ${item.status === "نقداً" ? "bg-green-50" : "bg-orange-50"}`}>
                        <Text className={`text-xs font-bold ${item.status === "نقداً" ? "text-green-700" : "text-orange-700"}`}>
                          {item.status || "نقداً"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        )}
      </Page>
    </Screen>
  );
}