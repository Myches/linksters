import Navbar from "../components/Navbar";
import { Inter } from "next/font/google";
import Preview from "../components/Preview";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
          <div className="flex justify-around w-full h-full p-2">
            <div className="hidden md:block lg:block w-full lg:w-[40%]">
              <Preview />
            </div>
            <div className="w-full lg:w-[60%]">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
