import React from "react";
import { FlatList, View } from "react-native";
import Screen from "@/components/layout/screen";
import AppHeader from "@/components/layout/app-header";
import Page from "@/components/layout/page-container";
import InvoiceInfoSection from "./InvoiceInfoSection";
import AddInvoiceItemSection from "./AddInvoiceItemSection";
import InvoiceSummarySection from "./InvoiceSummarySection";
import InvoiceActionsSection from "./InvoiceActionsSection";

export default function AddInvoiceApp() {
  // مصفوفة وهمية فارغة فقط لتفعيل ذيل وترويسة الـ FlatList بشكل منظم
  const emptyData: any[] = [];

  return (
    <Screen>
      <AppHeader title="إضافة فاتورة" showSettingsIcon={true}/>
      <Page>
        <FlatList
          data={emptyData}
          renderItem={null} // لا يوجد عناصر متكررة أساسية ديناميكية هنا
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // مهم جداً لكي تغلق القائمة المنسدلة عند الضغط بالخارج
          ListHeaderComponent={
            <View className="gap-4 pb-2">
              {/* قسم معلومات العميل والبحث التلقائي */}
              <InvoiceInfoSection />
              
              {/* قسم إضافة الأصناف الجديد */}
              <AddInvoiceItemSection />
            </View>
          }
          ListFooterComponent={
            <View className="gap-4 pt-2 mb-6">
              {/* جدول ملخص وأصناف الفاتورة الحالية */}
              <InvoiceSummarySection />
              
              {/* أزرار الحفظ النهائي والتصدير للـ PDF */}
              <InvoiceActionsSection />
            </View>
          }
        />
      </Page>
    </Screen>
  );
}