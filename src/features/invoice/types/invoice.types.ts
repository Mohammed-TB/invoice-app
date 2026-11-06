export type InvoiceItem = {
  id: string;
  item_name: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  id?: string;
  customerName: string;
  currency: "SAR" | "YER";
  items: InvoiceItem[];
  total: number;
  invoiceNumber: string; 
  status: "نقداً" | "آجل"; 
  createdAt?: string | Date | number;
};

export type Customer = {
  id: number;
  name: string;
};