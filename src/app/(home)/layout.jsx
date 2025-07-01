import "@/app/globals.css";
import { Providers } from "@/reduxToolkit/provider";
import CustomerLayout from "@/components/layout/CustomerLayout";

export default function HomeLayout({ children }) {
  return (
    <>
      <Providers>
        <CustomerLayout>{children}</CustomerLayout>
      </Providers>
    </>
  );
}
