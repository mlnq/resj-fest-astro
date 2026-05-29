import { ArrowRight, Heart, MessageCircle, Music2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { TICKET_PRICE } from "../../../config/event";
import {
  PARTICIPANT_AGE_LABEL,
  PARTICIPANT_AGE_MESSAGE,
  PARTICIPANT_BIRTH_DATE_MAX,
  PARTICIPANT_BIRTH_DATE_MIN,
  parseDateInput,
  isAgeWithinParticipantRange,
} from "../../utils/participantAge";
import { submitRegistrationWebhook } from "../../utils/registrationWebhook";

type FinalCtaSectionProps = {
  sectionId?: string;
  palmaSrc: string;
  lodzSrc: string;
  wodaSrc: string;
};

const agendaItems = [
  {
    icon: Users,
    text: "Popołudnie pełne relacji, rozmów i przestrzeni, żeby po prostu pobyć razem.",
  },
  {
    icon: MessageCircle,
    text: "Strefy chillu i spotkania z ludźmi, którzy mają coś prawdziwego do powiedzenia.",
  },
  {
    icon: Heart,
    text: "Czas modlitwy i moment, żeby zatrzymać się przy Bogu bez presji.",
  },
  {
    icon: Music2,
    text: "Wieczorny finał: koncerty, wspólne śpiewanie i mocny klimat do końca dnia.",
  },
] as const;
const ticketBenefits = [
  `Koszt udziału to ${TICKET_PRICE} i nie ma tu żadnych ukrytych dopłat.`,
  "Po zapisie dostajesz mail z danymi do przelewu i dalszymi informacjami.",
  "Cała rejestracja zajmuje mniej niż minutę.",
] as const;

const formatBirthDate = (value: string) => {
  const parsed = parseDateInput(value);
  if (!parsed) return value;

  return `${String(parsed.day).padStart(2, "0")}.${String(parsed.month).padStart(2, "0")}.${parsed.year}`;
};

const participantSchema = z.object({
  fullName: z.string().trim().min(2, "Podaj imię i nazwisko."),
  email: z.email("Podaj poprawny adres e-mail."),
  birthDate: z
    .string()
    .trim()
    .min(1, "Podaj datę urodzenia.")
    .refine((value) => parseDateInput(value) !== null, "Podaj poprawną datę urodzenia.")
    .refine((value) => {
      const parsed = parseDateInput(value);
      return parsed ? isAgeWithinParticipantRange(parsed) : true;
    }, PARTICIPANT_AGE_MESSAGE),
});

type ParticipantFormValues = {
  fullName: string;
  email: string;
  birthDate: string;
};

type ParticipantFormErrors = Partial<Record<keyof ParticipantFormValues, string>>;
type SubmissionState = "idle" | "success" | "error";

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
  const [birthDate, setBirthDate] = useState("");
  const [errors, setErrors] = useState<ParticipantFormErrors>({});
  const [hasAttemptedContinue, setHasAttemptedContinue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const participantValues: ParticipantFormValues = {
    fullName,
    email,
    birthDate,
  };

  useEffect(() => {
    if (!hasAttemptedContinue) return;
    setErrors(getParticipantErrors(participantValues));
  }, [fullName, email, birthDate, hasAttemptedContinue]);

  const resetForm = () => {
    setStep(1);
    setFullName("");
    setEmail("");
    setBirthDate("");
    setErrors({});
    setHasAttemptedContinue(false);
  };

  const handleContinue = () => {
    setHasAttemptedContinue(true);
    const nextErrors = getParticipantErrors(participantValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStep(2);
    }
  };

  const handleSubmitRegistration = async () => {
    setIsSubmitting(true);
    setSubmissionState("idle");
    setSubmissionMessage("");

    const result = await submitRegistrationWebhook({
      fullName,
      email,
      birthDate,
      ticketPrice: TICKET_PRICE,
    });

    if (result.ok) {
      setSubmissionState("success");
      setSubmissionMessage(result.message);
      resetForm();
    } else {
      setSubmissionState("error");
      setSubmissionMessage(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id={sectionId}
      className="relative overflow-x-hidden bg-white px-5 py-16 text-[#21314E] md:px-6 md:py-18"
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
            Co czeka na Ciebie w Arce?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[0.98rem] leading-6 text-[#32415E] md:mt-7 md:text-[1.22rem] md:leading-[1.4]">
            Zobacz plan dnia i koszt udziału, zanim przejdziesz do zapisu.
          </p>
        </div>

        <div
          className="paper-grain mt-8 bg-white/88 p-5 text-left shadow-[0_18px_40px_rgba(44,47,94,0.1)] backdrop-blur md:mt-10 md:p-6"
          style={{ clipPath: "polygon(1% 0, 100% 1%, 99% 100%, 0 99%)" }}
        >
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {agendaItems.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 rounded-2xl bg-[#FFF8E3] px-4 py-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F9E926] text-[#21314E] shadow-[0_8px_18px_rgba(121,109,8,0.12)]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} />
                </div>
                <p className="text-[0.95rem] leading-6 text-[#273249] md:text-[1rem]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:mt-10 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-8">
          <form
            className="paper-grain relative z-20 space-y-4 rounded-[1.75rem] border border-[#DDD7C7] bg-white p-4 text-[#21314E] shadow-[0_18px_40px_rgba(44,47,94,0.14)] md:space-y-5 md:p-6"
            onSubmit={(event) => event.preventDefault()}
          >
            {submissionState !== "idle" ? (
              <div
                className={`rounded-[1.1rem] px-4 py-3 text-center ${
                  submissionState === "success"
                    ? "border border-[#B8DABF] bg-[#F3FFF4] text-[#21552A]"
                    : "border border-[#E6B3BC] bg-[#FFF7F8] text-[#8A2942]"
                }`}
              >
                <p className="text-[0.92rem] font-semibold md:text-[0.98rem]">
                  {submissionMessage}
                </p>
              </div>
            ) : null}

            <div className="rounded-[1.1rem] border border-[#E8D98D] bg-[#FFF8E3] px-4 py-3 text-center">
              <p className="text-[0.92rem] font-semibold text-[#3E3354] md:text-[0.98rem]">
                Koszt udziału to {TICKET_PRICE} (zapis zajmie Ci mniej niż minutę).
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-sans text-[0.78rem] font-semibold tracking-[0.12em] text-[#7E745D] uppercase">
                  Krok {step}/2
                </p>
                <h3 className="mt-2 text-[1.55rem] font-black tracking-[-0.03em] text-[#1F2535]">
                  {step === 1 ? "Dane uczestnika" : "Podsumowanie"}
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
                    htmlFor="birth-date"
                    className="block font-sans text-[0.92rem] font-semibold tracking-[0.01em] text-[#3E3354]"
                  >
                    Data urodzenia
                  </label>
                  <input
                    id="birth-date"
                    type="date"
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    min={PARTICIPANT_BIRTH_DATE_MIN}
                    max={PARTICIPANT_BIRTH_DATE_MAX}
                    aria-invalid={Boolean(errors.birthDate)}
                    className={`w-full rounded-xl border bg-[#FCFBF7] px-4 py-3.5 text-base text-[#21314E] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] focus:outline-none ${
                      errors.birthDate
                        ? "border-[#B4495D] bg-[#FFF8FA] focus:border-[#B4495D]"
                        : "border-[#CAC2AE] focus:border-[#503967]"
                    }`}
                  />
                  {errors.birthDate ? (
                    <p className="text-[0.82rem] font-medium text-[#B4495D]">
                      {errors.birthDate}
                    </p>
                  ) : (
                    <p className="text-[0.82rem] text-[#6E6A61]">
                      Wydarzenie jest dla osób w wieku {PARTICIPANT_AGE_LABEL}.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F9E926] px-6 py-3.5 text-center font-sans text-[0.95rem] font-semibold tracking-[0.02em] text-[#21314E] shadow-[0_18px_40px_rgba(121,109,8,0.22)] transition-transform hover:scale-[1.01] hover:bg-[#F3E000] disabled:cursor-not-allowed disabled:bg-[#E6DFC5] disabled:text-[#6E6A61] disabled:shadow-none md:px-8 md:text-[1rem]"
                >
                  <span>Chcę tam być</span>
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
                    <p><strong>Data urodzenia:</strong> {formatBirthDate(birthDate)}</p>
                  </div>
                </div>

                <div className="rounded-[1.1rem] border border-[#DDD7C7] bg-[#FFF8E3] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[1.1rem] font-black tracking-[-0.03em] text-[#1F2535]">
                        Udział w Rejs Fest 26
                      </p>
                      <p className="mt-1 text-[0.95rem] leading-6 text-[#4F596C]">
                        Po zapisie wyślemy Ci mail z danymi do przelewu za udział w wydarzeniu.
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
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded-xl border border-[#CAC2AE] bg-white px-5 py-3 text-center font-sans text-[0.94rem] font-semibold text-[#503967] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Wracam do danych
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitRegistration}
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F9E926] px-6 py-3.5 text-center font-sans text-[0.95rem] font-semibold tracking-[0.02em] text-[#21314E] shadow-[0_18px_40px_rgba(121,109,8,0.22)] transition-transform hover:scale-[1.01] hover:bg-[#F3E000] disabled:cursor-not-allowed disabled:bg-[#E6DFC5] disabled:text-[#6E6A61] disabled:shadow-none"
                  >
                    <span>{isSubmitting ? "Wysyłam..." : "Potwierdzam zapis"}</span>
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
              {step === 1 ? "Jak to działa" : "Co dalej po zapisie"}
            </p>
            {step === 1 ? (
              <div className="mt-5 space-y-4 text-[0.97rem] leading-7 text-white/92">
                <p>
                  <strong>Krok 1:</strong> zostawiasz dane uczestnika.
                </p>
                <p>
                  <strong>Krok 2:</strong> widzisz podsumowanie i potwierdzasz zapis bez
                  przechodzenia do osobnej zakładki.
                </p>
                <p>
                  <strong>Efekt:</strong> po zapisie dostajesz w mailu dane do przelewu i
                  dalsze informacje organizacyjne.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3 text-[0.97rem] leading-7 text-white/92">
                <p>Po zapisaniu wyślemy Ci wiadomość z danymi do przelewu.</p>
                <p>Masz tu podsumowanie swoich danych i koszt udziału.</p>
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
