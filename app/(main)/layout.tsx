"use client";
import React from "react";

import Header from "@/lib/components/layout/Header";
import Footer from "@/lib/components/layout/Footer";

export default function MainLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}