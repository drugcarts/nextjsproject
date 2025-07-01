"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((seg) => seg && seg.toLowerCase() !== "home"); // REMOVE 'home' if in URL

  // Optional: Add 'Home' manually at start
  const breadcrumbItems = [""].concat(pathSegments); // '' will be '/'

  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex space-x-2">
        {breadcrumbItems.map((segment, index) => {
          const isHome = index === 0;
          const isLast = index === breadcrumbItems.length - 1;
          const href = "/" + breadcrumbItems.slice(1, index + 1).join("/");

          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={isHome ? "/" : href}
                    className="hover:underline capitalize my-3"
                  >
                    {isHome ? "Home" : segment.replace(/-/g, " ")}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              ) : (
                <span className="capitalize">{segment.replace(/-/g, " ")}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
