"use client";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import AuthProvider from "@/lib/supabase/AuthProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollTop from "@/components/ScrollToTop";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <ScrollTop />
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </Provider>
    </>
  );
}
