import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center border-b border-gray-300 dark:border-gray-700">
          <div className="mr-4 flex items-center">
            <span className="font-medium text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>EasyExchange</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
