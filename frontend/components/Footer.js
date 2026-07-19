export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f172a] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm">
        © {new Date().getFullYear()} Student Management System |
        Developed by <span className="font-semibold text-white">Shumail Rahat Khan</span>
      </div>
    </footer>
  );
}