import { InvoiceRepository } from "../repositories/invoice.repository";
import { Invoice, Customer } from "../types/invoice.types";

export const InvoiceService = {
  // جلب كل العملاء لـ Dropdown
  getAllCustomers(): Customer[] {
    return InvoiceRepository.getCustomers();
  },

  // 🔥 الدالة الجديدة: جلب كل الفواتير المحفوظة كاملة لدفتر الفواتير
  getSavedInvoices(): Invoice[] {
    // جلب الفواتير الأساسية من الداتابيز
    const rawInvoices = InvoiceRepository.getAllInvoices();

    // دمج الأصناف وحساب الإجماليات لكل فاتورة
    const fullInvoices: Invoice[] = rawInvoices.map((inv) => {
      const invoiceId = inv.id;
      const items = InvoiceRepository.getItemsByInvoiceId(invoiceId);
      const total = InvoiceRepository.getInvoiceTotal(invoiceId);

      return {
        id: invoiceId.toString(),
        invoiceNumber: inv.invoice_number,
        customerName: inv.customer_name,
        currency: inv.currency as "SAR" | "YER",
        status: inv.status as "نقداً" | "آجل",
        items: items,
        total: total,
      };
    });

    return fullInvoices;
  },

  // حفظ الفاتورة كاملة والتعامل مع منطق العميل (الكود الحالي الخاص بك)
  async saveFullInvoice(invoice: Invoice): Promise<string> {
    const nameTrimmed = invoice.customerName.trim();
    if (!nameTrimmed) throw new Error("اسم العميل مطلوب");

    // 1. التحقق من العميل أو إنشاؤه
    const existingCustomer = InvoiceRepository.getCustomerByName(nameTrimmed);
    if (!existingCustomer) {
      InvoiceRepository.createCustomer(nameTrimmed);
    }

    // 2. تجهيز بيانات الفاتورة الرقمية (مثل الدفتر)
    const generatedNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const createdAt = new Date().toISOString();

    // 3. حفظ الفاتورة الرئيسية
    const invoiceId = InvoiceRepository.createInvoice(
      generatedNumber,
      nameTrimmed,
      invoice.currency,
      invoice.status || "نقداً",
      createdAt
    );

    // 4. حفظ الأصناف التابعة لها
    for (const item of invoice.items) {
      InvoiceRepository.createInvoiceItem(invoiceId, item.item_name, item.quantity, item.price);
    }

    return generatedNumber; // نعيد رقم الفاتورة الجديد لعرضه في شاشة الـ PDF
  }
};