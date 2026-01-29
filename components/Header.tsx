import Link from 'next/link';
import { LayoutDashboard, Map, Settings, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          {title ? (
            <>
              <ArrowLeft className="h-5 w-5 text-gray-500" />
              <Map className="h-6 w-6" />
              <span className="text-gray-900">{title}</span>
            </>
          ) : (
            <>
              <Map className="h-6 w-6" />
              <span className="">Real Estate Journey Planner</span>
            </>
          )}
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Projects
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Templates
          </Link>
        </nav>
      </div>
    </header>
  );
}
