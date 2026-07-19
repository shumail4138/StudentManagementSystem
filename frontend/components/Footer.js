export default function Footer() {
  return (
    <footer className="w-full border-t border-white/20 bg-slate-900 py-3">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-white">
        © {new Date().getFullYear()} Student Management System | Developed by{" "}
        <span className="font-semibold">Shumail Rahat Khan</span>
      </div>
    </footer>
  );
}