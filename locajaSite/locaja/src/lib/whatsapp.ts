import type { Branch } from "@/data/branches";

export function whatsappLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}

export function branchWhatsApp(branch: Branch) {
  return branch.mobile ?? branch.phone;
}
