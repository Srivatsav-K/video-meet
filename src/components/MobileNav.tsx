"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger icon"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>

        <SheetContent side={"left"} className="border-none bg-dark-1">
          <SheetClose asChild>
            <Link href={"/"} className="flex items-center gap-1">
              <Image
                src={"/icons/logo.svg"}
                alt="video meet logo"
                width={32}
                height={32}
                className="max-sm:size-10"
              />

              <p className="tesxt-[26px] font-extrabold text-white">
                Video meet
              </p>
            </Link>
          </SheetClose>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((link) => {
                const isActive =
                  pathname === link.route ||
                  pathname.startsWith(`${link.route}/`);

                return (
                  <SheetClose key={link.label} asChild>
                    <Link
                      href={link.route}
                      className={cn(
                        "flex w-full max-w-60 items-center gap-4 rounded-lg p-4",
                        {
                          "bg-blue-1": isActive, // will only trigger if isActive is true (dynamic styles)
                        },
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};
export default MobileNav;
