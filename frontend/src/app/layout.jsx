import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/user";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Cinema E-Booking System",
    description: "Movie ticket booking and management sytem.",
};

export default function RootLayout({children}) {
    return (
        <AuthProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    {children}
                </body>
            </html>
        </AuthProvider>
    );
}
