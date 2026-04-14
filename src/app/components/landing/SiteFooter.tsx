import {
  Facebook,
  Instagram,
  Mail,
  Music2,
  Youtube,
} from "lucide-react";
import packageJson from "../../../../package.json";
import { withBasePath } from "../../utils/assets";

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook Rejs Fest",
    icon: Facebook,
  },
  {
    href: "https://www.youtube.com/",
    label: "YouTube Rejs Fest",
    icon: Youtube,
  },
  {
    href: "https://www.instagram.com/rejsfest",
    label: "Instagram Rejs Fest",
    icon: Instagram,
  },
  {
    href: "https://open.spotify.com/",
    label: "Spotify Rejs Fest",
    icon: Music2,
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-white px-4 py-8 text-[#232323] md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl px-2 py-4 md:px-0 md:py-5">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-center gap-5 md:justify-start">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-[#232323] transition hover:text-[#325DA8]"
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </a>
              ))}
              <a
                href="mailto:rejsfest@gmail.com"
                aria-label="Mail Rejs Fest"
                className="text-[#232323] transition hover:text-[#325DA8]"
              >
                <Mail className="h-5 w-5" strokeWidth={2.2} />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.98rem] font-medium text-[#4E5E7C] md:justify-start">
              <a href={withBasePath("/polityka-prywatnosci")} className="transition hover:text-[#232323]">
                Polityka prywatności
              </a>
              <a href={withBasePath("/informacje")} className="transition hover:text-[#232323]">
                Kontakt
              </a>
            </div>
          </div>

          <div className="space-y-2 text-center text-sm font-medium leading-relaxed text-[#4E5E7C] md:max-w-[260px] md:text-right">
            <p>Projekt i realizacja: Michał M</p>
            <p>Wersja apki: v{packageJson.version}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
