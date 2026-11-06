import { useContext } from "react";
import { InvoiceContext } from "../context/invoice-context";

export function useInvoice() {
  const context = useContext(InvoiceContext);
  

  if (!context) {
    throw new Error("useInvoice يجب أن يُستخدم داخل الـ InvoiceProvider");
  }
  
  return context;
}