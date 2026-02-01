'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CartProvider } from '@/components/context/CartContext';

/** Wraps app with Theme (dark mode) and Cart providers — no auth for showcase */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
