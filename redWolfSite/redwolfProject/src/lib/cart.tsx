import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  formatBRL,
  unitWhatsApp,
  type MenuItem,
  type UnitId,
} from "@/lib/brand";

export type CartLine = {
  item: MenuItem;
  qty: number;
};

type CartContextValue = {
  unit: UnitId;
  setUnit: (id: UnitId) => void;
  lines: CartLine[];
  count: number;
  total: number;
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  checkoutWhatsApp: (notes?: string) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<UnitId>("jaragua");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const add = (item: MenuItem) => {
      setLines((current) => {
        const found = current.find((line) => line.item.id === item.id);
        if (found) {
          return current.map((line) =>
            line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
          );
        }
        return [...current, { item, qty: 1 }];
      });
      setDrawerOpen(true);
    };

    const remove = (id: string) => {
      setLines((current) => current.filter((line) => line.item.id !== id));
    };

    const setQty = (id: string, qty: number) => {
      if (qty < 1) {
        remove(id);
        return;
      }
      setLines((current) =>
        current.map((line) => (line.item.id === id ? { ...line, qty } : line)),
      );
    };

    const total = lines.reduce((sum, line) => sum + line.item.price * line.qty, 0);
    const count = lines.reduce((sum, line) => sum + line.qty, 0);

    const checkoutWhatsApp = (notes?: string) => {
      const body = lines
        .map(
          (line) =>
            `• ${line.qty}x ${line.item.name} — ${formatBRL(line.item.price * line.qty)}`,
        )
        .join("\n");
      const extra = notes?.trim() ? `\n\nObs: ${notes.trim()}` : "";
      const text = `Olá, Redwolf! Pedido pelo site piloto:\n\n${body || "Quero montar um pedido."}\n\nTotal: ${formatBRL(total)}${extra}`;
      return unitWhatsApp(unit, text);
    };

    return {
      unit,
      setUnit,
      lines,
      count,
      total,
      add,
      remove,
      setQty,
      clear: () => setLines([]),
      drawerOpen,
      setDrawerOpen,
      checkoutWhatsApp,
    };
  }, [drawerOpen, lines, unit]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider");
  return ctx;
}
