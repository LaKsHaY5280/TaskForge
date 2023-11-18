import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import db from "@/lib/supabase/db";
import { ThemeProvider } from "@/lib/providers/next-theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Forge",
  description:
    "TaskForge is a dynamic task management platform designed to empower users in forging ahead with their projects and goals. With seamless collaboration features and intuitive organization tools, TaskForge streamlines your workflow, turning ideas into action. Stay in control, boost productivity, and conquer tasks with precision using TaskForge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log(db);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
