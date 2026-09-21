import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <Script src="//code.jivosite.com/widget/CDG7yCbXat" strategy="afterInteractive" />
    </div>
  );
}
