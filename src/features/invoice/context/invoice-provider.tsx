import React, { useState, useEffect } from "react";
import { InvoiceItem, Invoice } from "../types/invoice.types";
import { InvoiceContext } from "./invoice-context";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { InvoiceService } from "../services/invoice.service";

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>({
    customerName: "",
    currency: "YER",
    items: [],
    total: 0,
    invoiceNumber: "709635",
    status: "نقداً"
  });

  const [customersList, setCustomersList] = useState<any[]>([]);
  // 1. إضافة الـ State الخاص بقائمة الفواتير المحفوظة لتغذية شاشة الـ InvoicesApp
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);

  // تهيئة الداتابيز وجلب البيانات عند الإقلاع
  useEffect(() => {
    InvoiceRepository.init();
    refreshCustomers();
    refreshInvoices(); // 2. جلب الفواتير المحفوظة فور تشغيل التطبيق
  }, []);

  const refreshCustomers = () => {
    const list = InvoiceService.getAllCustomers();
    setCustomersList(list);
  };

  // 3. دالة سريعة لتحديث قائمة الفواتير من الداتابيز
  const refreshInvoices = () => {
    const list = InvoiceService.getSavedInvoices();
    setInvoicesList(list);
  };

  const setCustomerName = (name: string) => {
    setCurrentInvoice((prev) => ({ ...prev, customerName: name }));
  };

  const setCurrency = (currency: "SAR" | "YER") => {
    setCurrentInvoice((prev) => ({ ...prev, currency }));
  };

  const setStatus = (status: "نقداً" | "آجل") => {
    setCurrentInvoice((prev) => ({ ...prev, status }));
  };

  const addItem = (item: Omit<InvoiceItem, "id">) => {
    const newItem: InvoiceItem = { ...item, id: Math.random().toString() };
    setCurrentInvoice((prev) => {
      const updatedItems = [...prev.items, newItem];
      const newTotal = updatedItems.reduce((sum, i) => sum + i.quantity * i.price, 0);
      return { ...prev, items: updatedItems, total: newTotal };
    });
  };

  // استدعاء السيرفيس للحفظ المُنظم
const saveInvoiceToDatabase = async () => {
  try {
    console.log("جاري محاولة حفظ الفاتورة الحالية:", currentInvoice);

    // 1. تنفيذ عملية الحفظ في الداتابيز
    const newInvoiceNumber = await InvoiceService.saveFullInvoice(currentInvoice);

    // 2. تحديث رقم الفاتورة الحالية
    setCurrentInvoice((prev) => ({ ...prev, invoiceNumber: newInvoiceNumber }));

    // 3. تأخير بسيط جداً لتحديث القوائم لتجنب Re-render crash مع NativeWind
    setTimeout(() => {
      refreshCustomers();
      refreshInvoices();
    }, 50);

    return true;
  } catch (error: any) {
    console.error("خطأ الحفظ بالتفصيل:", error);
    alert(error.message || "حدث خطأ أثناء الحفظ في قاعدة البيانات");
    return false;
  }
};

  const resetInvoice = () => {
    setCurrentInvoice({
      customerName: "",
      currency: "YER",
      items: [],
      total: 0,
      invoiceNumber: Math.floor(100000 + Math.random() * 900000).toString(), // حركة ذكية: توليد رقم جديد عند التصفير
      status: "نقداً"
    });
  };

  return (
    <InvoiceContext.Provider 
      value={{ 
        currentInvoice, 
        customersList, 
        invoicesList,
        setCustomerName, 
        setCurrency, 
        setStatus, 
        addItem, 
        saveInvoiceToDatabase, 
        resetInvoice 
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}