export type RegistrationSubmissionInput = {
  fullName: string;
  email: string;
  birthDate: string;
  ticketPrice: string;
};

export type RegistrationSubmissionResult =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
    };

const REQUEST_ERROR_MESSAGE =
  "Nie udało się wysłać formularza. Spróbuj ponownie za chwilę albo napisz na rejsfest@gmail.com.";

export async function submitRegistrationWebhook(
  input: RegistrationSubmissionInput,
): Promise<RegistrationSubmissionResult> {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const result = (await response.json()) as RegistrationSubmissionResult;
    return result;
  } catch {
    return {
      ok: false,
      message: REQUEST_ERROR_MESSAGE,
    };
  }
}
