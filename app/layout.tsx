import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weekly Planner",
  description: "Stay organized and on top of your tasks with our intuitive Weekly Planner web app. Designed for simplicity and efficiency, this tool allows you to easily manage your weekly schedule. Add tasks with specific dates and times, view your upcoming tasks at a glance, and seamlessly edit or delete entries as your plans change. The sleek, user-friendly interface ensures that you can quickly navigate between different views, whether you prefer a monthly overview or a detailed list. With the convenience of local storage, your tasks are always saved securely in your browser, making this planner the perfect companion for your daily productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo.jpg" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
