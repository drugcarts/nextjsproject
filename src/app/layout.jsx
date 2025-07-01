// app/layout.js
import "@/app/globals.css";
import { jost, poppins } from "@/utils/fonts";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Custom meta tags */}
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-TYRRY5XHN3`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-TYRRY5XHN3');
        `}
        </Script>
      </head>
      <body className={`${jost.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
