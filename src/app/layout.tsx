import type { Metadata } from 'next';
import { AppProviders } from './providers';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'FMC assessment'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
