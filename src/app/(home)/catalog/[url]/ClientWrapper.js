"use client";
import { useRouter } from "next/navigation";

const ClientWrapper = ({ cat_url, children }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/generic-index/${cat_url}`)}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
};

export default ClientWrapper;
