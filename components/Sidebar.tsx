import Link from 'next/link';
import { LayoutDashboard, Users, Building2, Calendar, FileText } from 'lucide-react';

export default function Sidebar() {
  const menu = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Data CPMI', href: '/dashboard/cpmi', icon: Users },
    { name: 'Agensi', href: '/dashboard/agensi', icon: Building2 },
    { name: 'Jadwal', href: '/dashboard/jadwal', icon: Calendar },
    { name: 'Laporan', href: '/dashboard/laporan', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <div className="mb-10">
        <h2 className="text-xl font-bold text-emerald-400">P4MI Admin</h2>
      </div>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition"
          >
            <item.icon className="h-5 w-5 text-emerald-400" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
