import "reflect-metadata";
import "../global.css";

export default function RootLayout({ children }) {
  return (
    <html  suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
