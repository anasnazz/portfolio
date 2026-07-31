import ThemeRegistry from "@/components/themeRegistry";
import "./globals.css";
import NavbarLoader from "@/components/NavbarLoader";
import DevHumorDialog from "@/components/DevHumorDialog";

export const metadata = {
  title: "MD.AT - Portfolio",
  description: "Personal portfolio of MD.AT - B.Tech Computer Science and Engineering Student.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          <DevHumorDialog />
          <NavbarLoader />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}