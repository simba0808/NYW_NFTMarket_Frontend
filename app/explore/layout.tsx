import React from "react";

import Header from "@/lib/components/layout/Header";
import Footer from "@/lib/components/layout/Footer";

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <main className="main-pt">
        {children}
      </main>
      <Footer />
    </div>
  );
}