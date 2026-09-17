import Link from "next/link";
import { Users, Building2, Calendar, FileText, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">P4MI Admin</h1>
              <p className="text-xs text-emerald-100">Pelindungan & Penempatan Pekerja Migran Indonesia</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2"
          >
            <span>Masuk Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
          Sistem Administrasi Terpadu P4MI
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Kelola data Calon Pekerja Migran Indonesia (CPMI), pemantauan status dokumen, agensi mitra, jadwal orientasi pra-pemberangkatan (OPP), dan laporan secara real-time.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition"
          >
            Buka Panel Utama
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Data CPMI</h3>
            <p className="text-sm text-slate-500">
              Pendaftaran, verifikasi NIK, paspor, kontak, alamat, dan riwayat status dari pendaftaran hingga keberangkatan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Agensi / PPTKIS</h3>
            <p className="text-sm text-slate-500">
              Manajemen data agensi mitra penempatan luar negeri dan koordinasi penempatan sektor formal/informal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Jadwal Pelatihan & OPP</h3>
            <p className="text-sm text-slate-500">
              Pengaturan jadwal Orientasi Pra-Pemberangkatan (OPP) dan pelatihan berkala bagi CPMI.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Laporan & Statistik</h3>
            <p className="text-sm text-slate-500">
              Rekapitulasi jumlah CPMI berdasarkan negara tujuan, status, dan periode waktu siap export.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} P4MI Admin System. All rights reserved.</p>
      </footer>
    </div>
  );
}
