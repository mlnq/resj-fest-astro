import { Instagram, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-white px-5 py-14 text-[#21314E] md:px-8 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <p className="font-rejsfest text-4xl uppercase tracking-[0.04em] text-[#21314E]">
            Rejs Fest
          </p>
          <p className="mt-4 max-w-md text-base leading-7 text-[#667089]">
            Festiwal doświadczenia młodego Kościoła. Strona zbiera najważniejsze
            informacje, kontakt i aktualności dotyczące wydarzenia.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#F9E926]">
            Kontakt I Media
          </h3>
          <div className="space-y-3 text-[1rem] text-[#667089]">
            <a href="tel:123444121" className="flex items-center gap-3 hover:text-[#21314E]">
              <Phone className="h-4 w-4" />
              <span>123444121</span>
            </a>
            <a
              href="mailto:rejsfest@gmail.com"
              className="flex items-center gap-3 hover:text-[#21314E]"
            >
              <Mail className="h-4 w-4" />
              <span>rejsfest@gmail.com</span>
            </a>
            <a
              href="https://www.instagram.com/rejsfest"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-[#21314E]"
            >
              <Instagram className="h-4 w-4" />
              <span>@rejsfest</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#F29BBE]">
            Informacje
          </h3>
          <div className="space-y-3 text-[1rem] text-[#667089]">
            <a href="/regulamin" className="block hover:text-[#21314E]">
              Regulamin
            </a>
            <a href="/polityka-prywatnosci" className="block hover:text-[#21314E]">
              Polityka prywatności
            </a>
            <a href="/program" className="block hover:text-[#21314E]">
              Program
            </a>
            <a href="/informacje" className="block hover:text-[#21314E]">
              Informacje dla uczestników
            </a>
            <a href="/faq" className="block hover:text-[#21314E]">
              FAQ
            </a>
            <a href="/organizatorzy-i-partnerzy" className="block hover:text-[#21314E]">
              Organizatorzy i partnerzy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
