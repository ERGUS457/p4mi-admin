export default function JadwalPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jadwal Pelatihan & OPP</h1>
          <p className="text-sm text-slate-500">Kelola jadwal orientasi pra-pemberangkatan</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
          + Tambah Jadwal
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-slate-500 py-12">
        <p>Belum ada jadwal kegiatan yang dibuat.</p>
      </div>
    </div>
  );
}
