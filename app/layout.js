import { Inter } from "next/font/google";
import "rsuite/dist/rsuite-no-reset.min.css";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { GlobalProvider } from "./context/GlobalState";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Em App",
    description: "A mini social app.",
};

export default function RootLayout({ children }) {
    return (
        <html className={`h-full`} lang='en'>
            <body className={(inter.className, `bg-emBgColor h-full`)}>
                <GlobalProvider>
                    <AuthProvider>{children}</AuthProvider>
                </GlobalProvider>
            </body>
        </html>
    );
}
