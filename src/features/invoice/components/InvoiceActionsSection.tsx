import Button from "@/components/ui/button";
import React, { useState } from "react";
import { View } from "react-native";
import { Save, Eye } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useInvoice } from "../hooks/use-invoice";
import Toast from "react-native-toast-message";

export default function InvoiceActionsSection() {
  const router = useRouter();
  const { currentInvoice, saveInvoiceToDatabase, resetInvoice } = useInvoice();
  const [loading, setLoading] = useState(false);

  // 1. معاينة آمنة مع تمرير البيانات واستخدام Toast للتنبيهات
  const handlePreview = () => {
    try {
      if (!currentInvoice?.customerName?.trim()) {
        Toast.show({
          type: 'error',
          text1: 'تنبيه',
          text2: 'يرجى إدخال اسم العميل قبل المعاينة',
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }

      if (!currentInvoice?.items || currentInvoice.items.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'تنبيه',
          text2: 'يرجى إضافة صنف واحد على الأقل للمعاينة',
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }

      // تمرير البيانات كـ Query Param لضمان قراءتها في شاشة Preview دون Crash
      const invoiceDataString = JSON.stringify(currentInvoice);
      router.push({
        pathname: "/invoice/preview",
        params: { invoiceData: invoiceDataString }
      });
    } catch (error) {
      console.error("Preview Error:", error);
      Toast.show({
        type: 'error',
        text1: 'خطأ',
        text2: 'حدث خطأ أثناء تجهيز معاينة الفاتورة',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  // 2. حفظ آمن مع مسح البيانات والتنقل لصفحة الفواتير
  const handleSave = async () => {
    if (!currentInvoice?.customerName?.trim()) {
      Toast.show({
        type: 'error',
        text1: 'تنبيه',
        text2: 'يرجى إدخال اسم العميل قبل الحفظ',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (!currentInvoice?.items || currentInvoice.items.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'تنبيه',
        text2: 'لا يمكن حفظ الفاتورة بدون أصناف',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const isSuccess = await saveInvoiceToDatabase();

      if (isSuccess) {
        Toast.show({
          type: 'success',
          text1: 'تم الحفظ بنجاح 👏',
          text2: 'تم حفظ الفاتورة بنجاح',
          position: 'top',
          visibilityTime: 2500,
        });

        // مسح بيانات الفاتورة والأصناف
        if (typeof resetInvoice === 'function') {
          resetInvoice();
        }

        // الانتقال لصفحة الفواتير
        router.push('(tabs)'); 
      } else {
        Toast.show({
          type: 'error',
          text1: 'فشلت العملية',
          text2: 'لم يتم حفظ الفاتورة، يرجى المحاولة مرة أخرى',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.error("Save Error:", error);
      Toast.show({
        type: 'error',
        text1: 'خطأ',
        text2: 'حدث خطأ غير متوقع أثناء الحفظ',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-row items-center justify-between gap-3 p-2 w-full">
      {/* 1. زر الحفظ */}
      <View className="flex-1">
        <Button 
          title={loading ? "جاري الحفظ..." : "حفظ الفاتورة"} 
          icon={Save} 
          onPress={handleSave}
          disabled={loading}
        />
      </View>

      {/* 2. زر المعاينة */}
      <View className="flex-1">
        <Button 
          title="معاينة" 
          variant="outline"
          icon={Eye}
          onPress={handlePreview}
          disabled={loading}
        />
      </View>
    </View>
  );
}