import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Halló heimur, hér er vefurinn minn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
