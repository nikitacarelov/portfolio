import "./globals.css";

export const metadata = {
  title: "Nikita Carelov",
  description: "Nikita Carelov is a mechanical engineer studying at McGill University.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text font-sleek max-w-screen-lg mx-auto">
        {children}
      </body>
    </html>
  );
}