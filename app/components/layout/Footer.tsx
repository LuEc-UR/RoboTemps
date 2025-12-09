import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-black/70">

        {/* Colonna 1 */}
        <div className="flex flex-col gap-3">
          {/* Logo */}
          <Logo size={70} />
          
          <p className="max-w-xs leading-relaxed">
            Robotics standardization and Go-To-Market consulting.  
            Helping companies build scalable robot-based business models.
          </p>
        </div>

        {/* Colonna 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-base font-medium text-black">Company</h4>
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/consulting" className="hover:text-black">Consulting</Link>
          <Link href="/products" className="hover:text-black">Products</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
        </div>

        {/* Colonna 3 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-base font-medium text-black">Follow</h4>
          <Link href="https://linkedin.com" className="hover:text-black">LinkedIn</Link>
          <Link href="https://twitter.com" className="hover:text-black">Twitter/X</Link>
        </div>
      </div>

      <div className="border-t border-black/10 py-6 text-center text-xs text-black/50">
        © {new Date().getFullYear()} RoboTemps — All rights reserved.
      </div>
    </footer>
  );
}
