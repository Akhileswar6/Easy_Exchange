import { Header } from "@/components/layout/header";
import { CurrencyConverter } from "@/components/currency-converter";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-hero-pattern">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <CurrencyConverter />
        </div>
      </main>
    </div>
  );
}
