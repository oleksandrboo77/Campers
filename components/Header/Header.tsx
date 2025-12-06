"use client";

import Link from "next/link";
import Image from "next/image";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.navigationMenu}>
        <Link href="/" className={css.logo}>
          <Image src="/logo.svg" alt="TravelTrucks" width={136} height={16} />
        </Link>

        <nav className={css.links}>
          <Link href="/" className={css.homeLink}>
            Home
          </Link>
          <Link href="/catalog" className={css.catalogLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
