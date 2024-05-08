import { Inter } from "next/font/google";
import "rsuite/dist/rsuite-no-reset.min.css";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Em App",
    description: "A mini social app.",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={(inter.className, `bg-emBgColor`)}>{children}</body>
        </html>
    );
}
