import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import FloatingContact from './components/shared/FloatingContact';
import { PlanProvider } from '@/context/PlanContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <body className="bg-[#0d0e12] text-white min-h-screen flex flex-col justify-between relative selection:bg-[#ccff00] selection:text-black">
        <PlanProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingContact />
        </PlanProvider>
      </body>
    </html>
  );
}