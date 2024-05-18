import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex w-full justify-between bg-dark-1 px-6 py-4 lg:px-10">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/icons/logo.svg"}
          alt="video meet logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />

        <p className="tesxt-[26px] font-extrabold text-white max-sm:hidden">
          Video meet
        </p>
      </Link>
    </nav>
  );
};
export default Navbar;
