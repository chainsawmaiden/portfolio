import Link from "next/link";

export default function Navbar() {
  {/* NAVBAR */}
  return (
    <nav>
      <Link href="/" className="nav-link">Home</Link>
      <Link href="/product" className="nav-link">Product</Link>
      <Link href="/craft" className="nav-link">Visual</Link>
      <Link href="/about" className="nav-link">About</Link>
      <Link href="/contact" className="nav-link">Contact</Link>
    </nav>
  )
}