import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ParishCombobox } from "./components/ParishCombobox";

type FinalCtaSectionProps = {
  sectionId?: string;
  palmaSrc: string;
  lodzSrc: string;
  wodaSrc: string;
};

const bialystokParishes = [
  "Parafia pw. bł. Bolesławy Lament",
  "Parafia pw. Chrystusa Króla",
  "Parafia pw. Ducha Świętego",
  "Parafia pw. Matki Bożej Fatimskiej",
  "Parafia pw. Matki Bożej Różańcowej",
  "Parafia pw. Miłosierdzia Bożego",
  "Parafia pw. Najświętszego Serca Jezusa",
  "Parafia pw. Niepokalanego Serca Maryi",
  "Parafia pw. NMP Królowej Rodzin",
  "Parafia pw. NMP Matki Kościoła",
  "Parafia pw. NMP Nieustającej Pomocy",
  "Parafia pw. NMP z Guadalupe",
  "Parafia pw. Przemienienia Pańskiego",
  "Parafia pw. św. Andrzeja Boboli",
  "Parafia pw. św. Anny",
  "Parafia pw. św. Faustyny Kowalskiej",
  "Parafia pw. św. Floriana",
  "Parafia pw. św. Jadwigi Królowej",
  "Parafia pw. św. Jana Chrzciciela",
  "Parafia pw. św. Jerzego",
  "Parafia pw. św. Józefa Oblubieńca NMP",
  "Parafia pw. św. Karola Boromeusza",
  "Parafia pw. św. Kazimierza Królewicza",
  "Parafia pw. św. Krzysztofa",
  "Parafia pw. św. Maksymiliana Marii Kolbego",
  "Parafia pw. św. O. Pio",
  "Parafia pw. św. Rafała Kalinowskiego",
  "Parafia pw. św. Rocha",
  "Parafia pw. św. Stanisława B.M.",
  "Parafia pw. św. Wojciecha B.M.",
  "Parafia pw. Świętej Rodziny",
  "Parafia pw. Wniebowzięcia NMP (Katedra)",
  "Parafia pw. Wszystkich Świętych",
  "Parafia pw. Zmartwychwstania Pańskiego",
  "Parafia pw. Zwiastowania NMP",
] as const;

const OTHER_PARISH_OPTION = "Inne";
const TICKET_PRICE = "59,00 zł";
const ticketBenefits = [
  "Pełny dostęp do koncertu NiemaGotu i wszystkich stref.",
  "Pakiet uczestnika z identyfikatorem i festiwalowym merchem.",
  "Bez ukrytych kosztów - plaża, warsztaty i cały vibe masz w cenie.",
] as const;

const participantSchema = z
  .object({
    fullName: z.string().trim().min(2, "Podaj imię i nazwisko."),
    email: z.email("Podaj poprawny adres e-mail."),
    selectedParish: z.string().trim(),
    otherCommunity: z.string().trim(),
  })
  .superRefine(({ selectedParish, otherCommunity }, ctx) => {
    if (!selectedParish) {
      ctx.addIssue({
        code: "custom",
        path: ["selectedParish"],
        message: "Wybierz parafię albo opcję Inne.",
      });
    }

    if (selectedParish === OTHER_PARISH_OPTION && otherCommunity.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["otherCommunity"],
        message: "Wpisz nazwę parafii lub wspólnoty.",
      });
    }
  });

type ParticipantFormValues = {
  fullName: string;
  email: string;
  selectedParish: string;
  otherCommunity: string;
};

type ParticipantFormErrors = Partial<Record<keyof ParticipantFormValues, string>>;

const getParticipantErrors = (values: ParticipantFormValues): ParticipantFormErrors => {
  const result = participantSchema.safeParse(values);

  if (result.success) {
    return {};
  }

  const nextErrors: ParticipantFormErrors = {};

  for (const issue of result.error.issues) {
    const path = issue.path[0];
    if (!path || path in nextErrors) continue;

    nextErrors[path as keyof ParticipantFormValues] = issue.message;
  }

  return nextErrors;
};

export function FinalCtaSection({
  sectionId,
  palmaSrc,
  lodzSrc,
  wodaSrc,
}: FinalCtaSectionProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedParish, setSelectedParish] = useState("");
  const [otherCommunity, setOtherCommunity] = useState("");
  const [errors, setErrors] = useState<ParticipantFormErrors>({});
  const [hasAttemptedContinue, setHasAttemptedContinue] = useState(false);
  const participantValues: ParticipantFormValues = {
    fullName,
    email,
    selectedParish,
    otherCommunity,
  };
  const selectedOrigin =
    selectedParish === OTHER_PARISH_OPTION ? otherCommunity.trim() : selectedParish;

  useEffect(() => {
    if (!hasAttemptedContinue) return;
    setErrors(getParticipantErrors(participantValues));
  }, [fullName, email, selectedParish, otherCommunity, hasAttemptedContinue]);

  const handleContinue = () => {
    setHasAttemptedContinue(true);
    const nextErrors = getParticipantErrors(participantValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStep(2);
    }
  };

  return (
    <section
      id={sectionId}
      className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top,#fff6d8_0%,#eef2fe_44%,#d6dbf1_100%)] px-5 py-16 text-[#21314E] md:px-6 md:py-18"
    >
      <div className="absolute inset-0">
        <div className="paper-grain absolute inset-0 opacity-45 mix-blend-soft-light" />
        <div className="absolute left-[-8%] top-[8%] h-40 w-40 rounded-full bg-white/40 blur-3xl md:h-72 md:w-72" />
        <div className="absolute right-[-6%] bottom-[10%] h-48 w-48 rounded-full bg-[#9DA0D0]/26 blur-3xl md:h-80 md:w-80" />
        <img
          src={palmaSrc}
          alt=""
          className="absolute left-[6%] top-[12%] w-16 opacity-8 md:w-24"
        />
        <img
          src={lodzSrc}
          alt=""
          className="absolute right-[8%] bottom-[18%] w-16 opacity-8 md:w-24"
        />
        <img
          src={wodaSrc}
          alt=""
          className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] md:w-48"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        <div className="text-center">
          <h2 className="font-rejsfest text-[2.1rem] leading-[0.9] tracking-[0.03em] uppercase text-[#21314E] md:text-[4.9rem]">
            Nie czekaj na deszcz
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[0.98rem] leading-6 text-[#32415E] md:mt-7 md:text-[1.22rem] md:leading-[1.4]">
            Jeden prosty flow: najpierw dane uczestnika, potem podsumowanie i
            bilet. Bez skakania między zakładkami.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:mt-10 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-8">
          <form
            className="paper-grain relative z-20 space-y-4 rounded-[1.75rem] border border-[#DDD7C7] bg-white p-4 text-[#21314E] shadow-[0_18px_40px_rgba(44,47,94,0.14)] md:space-y-5 md:p-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-sans text-[0.78rem] font-semibold tracking-[0.12em] text-[#7E745D] uppercase">
                  Krok {step}/2
                </p>
                <h3 className="mt-2 text-[1.55rem] font-black tracking-[-0.03em] text-[#1F2535]">
                  {step === 1 ? "Dane uczestnika" : "Podsumowanie i płatność"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2].map((item) => (
                  <span
                    key={item}
                    className={`h-2.5 rounded-full transition-all ${
                      item === step ? "w-10 bg-[#503967]" : "w-6 bg-[#D9D3C4]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 ? (
              <>
                <div className="space-y-2 text-left">
                  <label
                    htmlFor="name"
                    className="block font-sans text-[0.92rem] font-semibold tracking-[0.01em] text-[#3E3354]"
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Jan Kowalski"
                    aria-invalid={Boolean(errors.fullName)}
                    className={`w-full rounded-xl border bg-[#FCFBF7] px-4 py-3.5 text-base text-[#21314E] placeholder:text-[#6E6A61] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] focus:outline-none ${
                      errors.fullName
                        ? "border-[#B4495D] bg-[#FFF8FA] focus:border-[#B4495D]"
                        : "border-[#CAC2AE] focus:border-[#503967]"
                    }`}
                  />
                  {errors.fullName ? (
                    <p className="text-[0.82rem] font-medium text-[#B4495D]">{errors.fullName}</p>
                  ) : null}
                </div>

                <div className="space-y-2 text-left">
                  <label
                    htmlFor="email"
                    className="block font-sans text-[0.92rem] font-semibold tracking-[0.01em] text-[#3E3354]"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="twoj@email.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full rounded-xl border bg-[#FCFBF7] px-4 py-3.5 text-base text-[#21314E] placeholder:text-[#6E6A61] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] focus:outline-none ${
                      errors.email
                        ? "border-[#B4495D] bg-[#FFF8FA] focus:border-[#B4495D]"
                        : "border-[#CAC2AE] focus:border-[#503967]"
                    }`}
                  />
                  {errors.email ? (
                    <p className="text-[0.82rem] font-medium text-[#B4495D]">{errors.email}</p>
                  ) : null}
                </div>

                <div className="space-y-2 text-left">
                  <label
                    className="block font-sans text-[0.92rem] font-semibold tracking-[0.01em] text-[#3E3354]"
                  >
                    Parafia / wspólnota
                  </label>
                  <ParishCombobox
                    options={bialystokParishes}
                    value={selectedParish}
                    onChange={setSelectedParish}
                    placeholder="Skąd przypływasz?"
                    emptyMessage="Brak parafii dla tego wyszukiwania"
                    specialOptionLabel={OTHER_PARISH_OPTION}
                    invalid={Boolean(errors.selectedParish)}
                  />
                  {errors.selectedParish ? (
                    <p className="text-[0.82rem] font-medium text-[#B4495D]">
                      {errors.selectedParish}
                    </p>
                  ) : null}
                </div>

                {selectedParish === OTHER_PARISH_OPTION ? (
                  <div className="space-y-2 text-left">
                    <label
                      htmlFor="other-community"
                      className="block font-sans text-[0.92rem] font-semibold tracking-[0.01em] text-[#3E3354]"
                    >
                      Wpisz swoją parafię / wspólnotę
                    </label>
                    <input
                      id="other-community"
                      type="text"
                      value={otherCommunity}
                      onChange={(event) => setOtherCommunity(event.target.value)}
                      placeholder="Np. parafia spoza Białegostoku albo nazwa wspólnoty"
                      aria-invalid={Boolean(errors.otherCommunity)}
                      className={`w-full rounded-xl border bg-[#FCFBF7] px-4 py-3.5 text-base text-[#21314E] placeholder:text-[#6E6A61] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] focus:outline-none ${
                        errors.otherCommunity
                          ? "border-[#B4495D] bg-[#FFF8FA] focus:border-[#B4495D]"
                          : "border-[#CAC2AE] focus:border-[#503967]"
                      }`}
                    />
                    {errors.otherCommunity ? (
                      <p className="text-[0.82rem] font-medium text-[#B4495D]">
                        {errors.otherCommunity}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#21314E] bg-[#F9E926] px-6 py-3.5 text-center font-sans text-[0.95rem] font-semibold tracking-[0.02em] text-[#21314E] shadow-[0_18px_40px_rgba(121,109,8,0.22)] transition-transform hover:scale-[1.01] hover:bg-[#F3E000] disabled:cursor-not-allowed disabled:border-[#AAA28E] disabled:bg-[#E6DFC5] disabled:text-[#6E6A61] disabled:shadow-none md:px-8 md:text-[1rem]"
                >
                  <span>Wchodzę na pokład</span>
                  <ArrowRight className="h-5 w-5" strokeWidth={2.8} />
                </button>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className="rounded-[1.1rem] border border-[#DDD7C7] bg-[#FCFBF7] p-4">
                  <p className="font-sans text-[0.78rem] font-semibold tracking-[0.12em] text-[#7E745D] uppercase">
                    Dane uczestnika
                  </p>
                  <div className="mt-3 space-y-2 text-[0.96rem] leading-6 text-[#273249]">
                    <p><strong>Imię i nazwisko:</strong> {fullName}</p>
                    <p><strong>E-mail:</strong> {email}</p>
                    <p><strong>Parafia / wspólnota:</strong> {selectedOrigin}</p>
                  </div>
                </div>

                <div className="rounded-[1.1rem] border border-[#DDD7C7] bg-[#FFF8E3] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[1.1rem] font-black tracking-[-0.03em] text-[#1F2535]">
                        Bilet Rejs Fest 26
                      </p>
                      <p className="mt-1 text-[0.95rem] leading-6 text-[#4F596C]">
                        Jedno miejsce na pokładzie. Cały dzień festiwalu w jednej cenie.
                      </p>
                    </div>
                    <p className="shrink-0 font-sans text-[1rem] font-semibold text-[#503967]">
                      {TICKET_PRICE}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex w-full items-center justify-center rounded-xl border border-[#CAC2AE] bg-white px-5 py-3 text-center font-sans text-[0.94rem] font-semibold text-[#503967]"
                  >
                    Wracam do danych
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#21314E] bg-[#F9E926] px-6 py-3.5 text-center font-sans text-[0.95rem] font-semibold tracking-[0.02em] text-[#21314E] shadow-[0_18px_40px_rgba(121,109,8,0.22)] transition-transform hover:scale-[1.01] hover:bg-[#F3E000]"
                  >
                    <span>Finalizuję zakup</span>
                    <ArrowRight className="h-5 w-5" strokeWidth={2.8} />
                  </button>
                </div>
              </>
            ) : null}
          </form>

          <div
            className="paper-grain relative z-10 bg-[#21314E] p-5 text-left text-white shadow-[0_18px_40px_rgba(31,22,44,0.24)] md:p-6"
            style={{ clipPath: "polygon(1.5% 0, 100% 1.5%, 98.5% 100%, 0 98.5%)" }}
          >
            <p className="font-sans text-[0.82rem] font-semibold tracking-[0.12em] text-[#F9E926] uppercase">
              {step === 1 ? "Jak to działa" : "Co dostajesz w cenie"}
            </p>
            {step === 1 ? (
              <div className="mt-5 space-y-4 text-[0.97rem] leading-7 text-white/92">
                <p>
                  <strong>Krok 1:</strong> zostawiasz dane uczestnika i wybierasz,
                  skąd przypływasz.
                </p>
                <p>
                  <strong>Krok 2:</strong> widzisz podsumowanie, cenę biletu i
                  finalizujesz zakup bez przechodzenia do osobnej zakładki.
                </p>
                <p>
                  <strong>Efekt:</strong> jeden czytelny proces, zero chaosu i
                  szybsze wejście na pokład.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3 text-[0.97rem] leading-7 text-white/92">
                {ticketBenefits.map((benefit) => (
                  <p key={benefit}>{benefit}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
