import { createContext } from "react";
import { Invoice, InvoiceItem, Customer } from "../types/invoice.types";

type InvoiceContextType = {
  currentInvoice: Invoice;
  customersList: Customer[]; 
  invoicesList: Invoice[];
  setCustomerName: (name: string) => void;
  setCurrentInvoice?: (invoice: Invoice | null) => void;
  setCurrency: (currency: "SAR" | "YER") => void;
  setStatus: (status: "نقداً" | "آجل") => void; 
  addItem: (item: Omit<InvoiceItem, "id">) => void;
  saveInvoiceToDatabase: () => Promise<boolean>; 
  resetInvoice: () => void;
};

export const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);