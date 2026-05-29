export type EventDate = {
  year: number;
  month: number;
  day: number;
};

export const EVENT_DATE = { year: 2026, month: 8, day: 29 } as const;
export const EVENT_DATE_DISPLAY = "29 sierpnia 2026";
export const PARTICIPANT_MIN_AGE = 16;
export const PARTICIPANT_MAX_AGE = 30;
export const PARTICIPANT_AGE_LABEL = `${PARTICIPANT_MIN_AGE}-${PARTICIPANT_MAX_AGE} lat`;
export const PARTICIPANT_AGE_MESSAGE = `Wydarzenie jest dla osób w wieku ${PARTICIPANT_AGE_LABEL} w dniu ${EVENT_DATE_DISPLAY}.`;

const toUtcDate = ({ year, month, day }: EventDate) => new Date(Date.UTC(year, month - 1, day));

const fromUtcDate = (value: Date): EventDate => ({
  year: value.getUTCFullYear(),
  month: value.getUTCMonth() + 1,
  day: value.getUTCDate(),
});

const shiftDays = (value: EventDate, days: number) => {
  const nextDate = toUtcDate(value);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return fromUtcDate(nextDate);
};

const formatDateInput = ({ year, month, day }: EventDate) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export const parseDateInput = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
};

export const getAgeOnEventDate = (birthDate: EventDate) => {
  let age = EVENT_DATE.year - birthDate.year;

  if (
    EVENT_DATE.month < birthDate.month ||
    (EVENT_DATE.month === birthDate.month && EVENT_DATE.day < birthDate.day)
  ) {
    age -= 1;
  }

  return age;
};

export const isAgeWithinParticipantRange = (birthDate: EventDate) => {
  const age = getAgeOnEventDate(birthDate);
  return age >= PARTICIPANT_MIN_AGE && age <= PARTICIPANT_MAX_AGE;
};

export const PARTICIPANT_BIRTH_DATE_MIN = formatDateInput(
  shiftDays(
    {
      year: EVENT_DATE.year - PARTICIPANT_MAX_AGE,
      month: EVENT_DATE.month,
      day: EVENT_DATE.day,
    },
    1,
  ),
);

export const PARTICIPANT_BIRTH_DATE_MAX = formatDateInput({
  year: EVENT_DATE.year - PARTICIPANT_MIN_AGE,
  month: EVENT_DATE.month,
  day: EVENT_DATE.day,
});
