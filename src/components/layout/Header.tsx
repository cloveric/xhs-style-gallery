import { ThemeToggle } from '@/components/common/ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <span className="text-sm font-bold">XS</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-text-primary dark:text-white sm:text-lg">
              小红书风格模板库
            </h1>
            <p className="hidden text-xs text-text-secondary dark:text-gray-400 sm:block">
              XHS Style Gallery
            </p>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
