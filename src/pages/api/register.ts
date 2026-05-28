import type { APIRoute } from 'astro';
import { TICKET_PRICE } from "../../config/event";

const SHEET_NAME = "RejsFestZapisy";
const ORGANIZER_EMAIL = "rejsfest@gmail.com";
const REPLY_TO = "rejsfest@gmail.com";
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/rejsfest",
  },
] as const;

export const POST: APIRoute = async ({ request }) => {
  try {
    const input = await request.json();

    const payload = {
      ...input,
      ticketPrice: input.ticketPrice || TICKET_PRICE,
      eventName: "Rejs Fest 2026",
      eventDate: "29 sierpnia 2026",
      eventLocation: "Białystok, Parafia NSM na Dojlidach",
      organizerInbox: ORGANIZER_EMAIL,
      socialLinks: SOCIAL_LINKS,
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = import.meta.env.REGISTRATION_WEBHOOK_URL;

    if (!webhookUrl) {
      return new Response(JSON.stringify({
        ok: false,
        message: "Brak PUBLIC_REGISTRATION_WEBHOOK_URL"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Serwer wywołuje GAS — zero problemów z CORS
    const gasResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!gasResponse.ok) {
      throw new Error(`GAS error: ${gasResponse.status}`);
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Zapis przyjęty. Sprawdź skrzynkę mailową - wyślemy Ci potwierdzenie i dane do przelewu."
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      ok: false,
      message: "Nie udało się wysłać formularza. Spróbuj ponownie za chwilę albo napisz na rejsfest@gmail.com."
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
