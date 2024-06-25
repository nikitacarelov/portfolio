import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Nikita Carelov",
  description: "Nikita Carelov is a mechanical engineer studying at McGill University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text max-w-screen-lg mx-auto font-serif">
        {children}
        <Analytics />

      </body>
    </html>
  );
}
