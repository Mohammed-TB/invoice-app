import Screen from "@/components/layout/screen";
import Page from "@/components/layout/page-container";
import AppHeader from "@/components/layout/app-header";
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useInvoice } from "../hooks/use-invoice"; 
import { Printer, Share2 } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from "react-native-webview"; // 1. استيراد WebView
import { getShopSettings, ShopSettings, initShopTable } from "../../../database/shop-db";

const { width } = Dimensions.get("window");

export default function PreviewApp() {
  const { currentInvoice: contextInvoice } = useInvoice() as any;
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  // حالة حفظ بيانات المحل الديناميكية من SQLite
  const [shopSettings, setShopSettings] = useState<ShopSettings>({
    name: "بيت الأناقة للارواب والكندورات والملابس الداخلية",
    phone: "770743837",
    address: "حضرموت-الشحر-سوق شبام امام السعدي للأثاث والزجاج",
    amqiAccount: "254000007",
    busairiAccount: "335000006",
  });

  // جلب البيانات الديناميكية من SQLite عند فتح شاشة المعاينة
  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        await initShopTable();
        const data = await getShopSettings();
        if (data) {
          setShopSettings(data);
        }
      } catch (e) {
        console.error("Error fetching shop settings for preview", e);
      }
    };
    fetchShopInfo();
  }, []);

  // ================= تأمين واستخراج بيانات الفاتورة =================
  let currentInvoice = contextInvoice;
  if (params?.invoiceData) {
    try {
      const parsedData = typeof params.invoiceData === 'string'
        ? JSON.parse(params.invoiceData)
        : params.invoiceData;
      if (parsedData) {
        currentInvoice = parsedData;
      }
    } catch (e) {
      console.log("Error parsing invoice data", e);
    }
  }

  // ================= محرك توليد الـ HTML المطابق للدفتر =================
  const generateInvoiceHtml = () => {
    const items = Array.isArray(currentInvoice?.items) ? currentInvoice.items : [];
    
    const itemsRows = items.map((item: any) => {
      const name = item?.item_name || item?.itemName || "صنف بدون اسم";
      const qty = Number(item?.quantity || 0);
      const price = Number(item?.price || 0);
      const total = (qty * price).toFixed(2);

      return `
        <tr>
          <td style="border: 1px solid #1a2556; padding: 6px; text-align: center; font-size: 12px; font-weight: bold;">${total}</td>
          <td style="border: 1px solid #1a2556; padding: 6px; text-align: center; font-size: 12px;">${price.toFixed(2)}</td>
          <td style="border: 1px solid #1a2556; padding: 6px; text-align: center; font-size: 12px;">${qty}</td>
          <td style="border: 1px solid #1a2556; padding: 6px; text-align: right; font-size: 12px; font-weight: bold;">${name}</td>
        </tr>
      `;
    }).join("");

    const emptyRowsCount = Math.max(0, 8 - items.length);
    const emptyRows = Array(emptyRowsCount).fill('<tr><td style="border: 1px solid #1a2556; height: 22px;"></td><td style="border: 1px solid #1a2556;"></td><td style="border: 1px solid #1a2556;"></td><td style="border: 1px solid #1a2556;"></td></tr>').join('');

    const dateStr = currentInvoice?.createdAt 
      ? new Date(currentInvoice.createdAt).toLocaleDateString('ar-EG')
      : new Date().toLocaleDateString('ar-EG');

    const statusStr = currentInvoice?.status === "نقداً" ? "☑ نقداً  ☐ أجل" : "☐ نقداً  ☑ أجل";
    const totalAmount = currentInvoice?.total ? Number(currentInvoice.total).toFixed(2) : "0.00";

    return `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          * { box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, sans-serif; padding: 8px; color: #1a2556; margin: 0 auto; background-color: #f8fafc; }
          .border-box { border: 2px solid #1a2556; border-radius: 12px; padding: 12px; background-color: #ffffff; }
          .header-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
          .header-table td { padding: 3px 0; font-size: 11px; font-weight: bold; }
          .badge { border: 1px solid #1a2556; border-radius: 15px; padding: 2px 8px; display: inline-block; font-size: 10px; }
          .invoice-num { border: 2px solid #1a2556; border-radius: 15px; padding: 2px 12px; color: #d9534f; font-weight: bold; font-size: 14px; }
          .items-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          .items-table th { border: 1px solid #1a2556; background-color: #f1f5f9; padding: 5px 2px; font-size: 10px; }
          .footer-note { font-size: 10px; margin-top: 10px; font-weight: bold; }
          .bank-accounts { margin-top: 10px; padding: 8px; border: 1px dashed #1a2556; border-radius: 6px; background-color: #f8fafc; font-size: 10px; }
        </style>
      </head>
      <body>
        <div class="border-box">
          <table class="header-table">
            <tr>
              <td style="width: 65%;"><strong>إسم المحل:</strong> ${shopSettings.name}</td>
              <td style="width: 35%;"><strong>فاكس:</strong> ..........................</td>
            </tr>
            <tr>
              <td><strong>العنوان:</strong> ${shopSettings.address}</td>
              <td><strong>س . ت:</strong> ..........................</td>
            </tr>
            <tr>
              <td><strong>تلفون:</strong> ${shopSettings.phone}</td>
              <td><strong>ص . ب:</strong> ..........................</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 8px;">
                <span class="badge">تاريخ: ${dateStr}</span>
                <span class="badge" style="margin-right: 4px;">فاتورة بيع</span>
                <span class="badge" style="margin-right: 4px;">${statusStr}</span>
                <span class="invoice-num" style="float: left;">${currentInvoice?.invoiceNumber || "709635"}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 10px;">
                <strong>المطلوب من الأخ /</strong> ${currentInvoice?.customerName || "عميل نقدي"} ................. المحترم
              </td>
            </tr>
          </table>

          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 22%;">الكمية الإجمالية<br><small>Total Amount</small></th>
                <th style="width: 18%;">سعر الوحدة<br><small>Unit Price</small></th>
                <th style="width: 12%;">العدد<br><small>Qty</small></th>
                <th style="width: 48%;">التفاضيـــــــل<br><small>Description</small></th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
              ${emptyRows}
              <tr>
                <td style="border: 1px solid #1a2556; text-align: center; font-weight: bold; background-color: #e2e8f0; font-size: 12px;">
                  ${totalAmount}
                </td>
                <td colspan="2" style="border: 1px solid #1a2556; text-align: center; font-weight: bold; background-color: #e2e8f0; font-size: 11px;">
                  الإجمالي Total
                </td>
                <td style="border: 1px solid #1a2556; background-color: #e2e8f0;"></td>
              </tr>
            </tbody>
          </table>

          <div class="footer-note">
            ● <strong>لطفاً:</strong> البضاعة المباعة لا ترد ولا تستبدل بعد خروجها من المحل.
          </div>

          <table style="width: 100%; margin-top: 15px; font-size: 10px; font-weight: bold;">
            <tr>
              <td>توقيع المشتري: ..........................</td>
              <td style="text-align: left;">توقيع البائع: ..........................</td>
            </tr>
          </table>

          <div class="bank-accounts">
            <strong>الحسابات المصرفية للتحويل:</strong><br/>
            ▪ <strong>حساب العمقي:</strong> ${shopSettings.amqiAccount}<br/>
            ▪ <strong>حساب البسيري:</strong> ${shopSettings.busairiAccount}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handlePrint = async () => {
    try {
      setLoading(true);
      const html = generateInvoiceHtml();
      await Print.printAsync({ html });
    } catch (error) {
      console.error("Print Error:", error);
      Alert.alert("تنبيه", "تعذر فتح معاينة الطباعة حالياً.");
    } finally {
      setLoading(false);
    }
  };

  const handleSharePdf = async () => {
    try {
      setLoading(true);
      const html = generateInvoiceHtml();
      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          UTI: ".pdf",
          mimeType: "application/pdf",
          dialogTitle: "مشاركة إشعار الفاتورة PDF",
        });
      } else {
        Alert.alert("تنبيه", "ميزة المشاركة غير مدعومة على هذا الجهاز.");
      }
    } catch (error) {
      console.error("Share Error:", error);
      Alert.alert("خطأ", "حدث خطأ أثناء إعداد ملف الـ PDF للمشاركة.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentInvoice) {
    return (
      <Screen>
        <AppHeader title="معاينة الفاتورة" showBack />
        <Page>
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-400 font-medium text-base">لم يتم اختيار فاتورة للمعاينة</Text>
          </View>
        </Page>
      </Screen>
    );
  }

  const htmlContent = generateInvoiceHtml();

  return (
    <Screen>
      <AppHeader title="معاينة إشعار الفاتورة" showBack />

      <Page>
        <View className="flex-1 my-1">
          {/* ================= معاينة HTML الحقيقية (WebView) ================= */}
          <View className="flex-1 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              scalesPageToFit={true}
            />
          </View>

          {/* ================= أزرار التحكم ================= */}
          <View className="flex-row gap-3 mt-3 mb-2 px-1">
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handlePrint}
              disabled={loading}
              className="flex-1 bg-blue-900 flex-row justify-center items-center p-3.5 rounded-xl gap-2 shadow-sm"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Printer size={18} color="#FFFFFF" />
                  <Text className="font-bold text-white text-sm">طباعة / PDF</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleSharePdf}
              disabled={loading}
              className="flex-1 bg-white flex-row justify-center items-center p-3.5 rounded-xl gap-2 border border-gray-200 shadow-sm"
            >
              <Share2 size={18} color="#4B5563" />
              <Text className="font-bold text-gray-700 text-sm">مشاركة (PDF)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Page>
    </Screen>
  );
}