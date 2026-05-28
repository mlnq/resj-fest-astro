# Google Apps Script: zapisy Rejs Fest

Ten wariant pozwala zostawić stronę na `GitHub Pages`, a obsługę zapisów oprzeć o:
- `Google Sheets` jako prostą bazę danych,
- `Google Apps Script` jako backend,
- `rejsfest@gmail.com` jako skrzynkę organizacyjną.

## 1. Arkusz

Utwórz arkusz Google z kolumnami:

```text
timestamp | full_name | email | birth_date | ticket_price | status | organizer_inbox
```

Przykładowe wartości:
- `status`: `nowy`
- `organizer_inbox`: `rejsfest@gmail.com`

## 2. Apps Script

W arkuszu wejdź w `Extensions` -> `Apps Script` i wklej:

```javascript
const SHEET_NAME = "RejsFestZapisy";
const ORGANIZER_EMAIL = "rejsfest@gmail.com";
const REPLY_TO = "rejsfest@gmail.com";
const DEFAULT_TICKET_PRICE = "59 zł";
const SOCIAL_LINKS = [
  { label: "Instagram", url: "https://www.instagram.com/rejsfest" },
];

function doPost(e) {
  try {
    Logger.log("POST received");

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Brak payloadu POST.");
    }

    const payload = JSON.parse(e.postData.contents);
    Logger.log("Payload: " + JSON.stringify(payload));

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Nie znaleziono zakładki: " + SHEET_NAME);

    sheet.appendRow([
      new Date(),
      payload.fullName || "",
      payload.email || "",
      payload.birthDate || "",
      payload.ticketPrice || DEFAULT_TICKET_PRICE,
      "nowy",
      ORGANIZER_EMAIL,
    ]);

    MailApp.sendEmail({
      to: ORGANIZER_EMAIL,
      subject: "Nowe zgłoszenie - Rejs Fest 2026",
      body:
        "Nowe zgłoszenie:\n\n" +
        "Imię i nazwisko: " + (payload.fullName || "") + "\n" +
        "E-mail: " + (payload.email || "") + "\n" +
        "Data urodzenia: " + (payload.birthDate || "") + "\n" +
        "Cena: " + (payload.ticketPrice || DEFAULT_TICKET_PRICE) + "\n",
      replyTo: payload.email || REPLY_TO,
    });

    const socialLinks = Array.isArray(payload.socialLinks) && payload.socialLinks.length
      ? payload.socialLinks
      : SOCIAL_LINKS;
    const socialBlock = socialLinks.length
      ? "Wpadaj też tutaj i bądź z nami na bieżąco:\n" +
        socialLinks.map((link) => "- " + link.label + ": " + link.url).join("\n") +
        "\n\n"
      : "";

    MailApp.sendEmail({
      to: payload.email,
      subject: "Rejs Fest 2026 - potwierdzenie zapisu",
      body:
        "Hej!\n\n" +
        "Dzięki za zapis na Rejs Fest 2026.\n" +
        "Twoje zgłoszenie zostało przyjęte.\n\n" +
        "Cieszymy się, że chcesz być z nami w Arce. Szykujemy dzień pełen spotkań, muzyki, modlitwy i dobrej energii.\n\n" +
        "Data: 29 sierpnia 2026\n" +
        "Miejsce: Białystok, Parafia NSM na Dojlidach\n" +
        "Koszt udziału: " + (payload.ticketPrice || DEFAULT_TICKET_PRICE) + "\n\n" +
        "Dane do przelewu:\n" +
        "Odbiorca: [uzupełnij]\n" +
        "Numer konta: [uzupełnij]\n" +
        "Tytuł przelewu: Rejs Fest 2026 - " + (payload.fullName || "") + "\n\n" +
        socialBlock +
        "W razie pytań pisz na: rejsfest@gmail.com\n",
      replyTo: REPLY_TO,
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("ERROR: " + error);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput("OK - Rejs Fest webhook działa")
    .setMimeType(ContentService.MimeType.TEXT);
}

function testWriteAndMail() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error("Nie znaleziono zakładki: " + SHEET_NAME);

  sheet.appendRow([
    new Date(),
    "Test User",
    "twoj-testowy-mail@example.com",
    "2000-01-01",
    DEFAULT_TICKET_PRICE,
    "test",
    ORGANIZER_EMAIL,
  ]);

  MailApp.sendEmail({
    to: ORGANIZER_EMAIL,
    subject: "TEST - Rejs Fest 2026",
    body: "To jest test maila do organizatora.",
    replyTo: REPLY_TO,
  });
}
```

## 3. Publikacja web app

W Apps Script:
- kliknij `Deploy`
- wybierz `New deployment`
- typ: `Web app`
- `Execute as`: `Me`
- `Who has access`: `Anyone`

Po publikacji dostaniesz URL web app.

## 4. Podpięcie do frontu

W lokalnym `.env` ustaw:

```env
REGISTRATION_WEBHOOK_URL=TU_WKLEJ_URL_Z_GOOGLE_APPS_SCRIPT
```

Ta zmienna jest obsłużona przez endpoint rejestracji i formularz w:
- [FinalCtaSection.tsx](/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/app/components/landing/FinalCtaSection.tsx)

## 5. Co robi front

Po kliknięciu `Potwierdzam zapis` formularz:
- waliduje dane,
- wysyła je do lokalnego `/api/register` przez `POST`,
- a endpoint serwerowy przekazuje payload do `REGISTRATION_WEBHOOK_URL`,
- pokazuje komunikat sukcesu albo błędu.

Wysyłane pola:
- `fullName`
- `email`
- `birthDate`
- `ticketPrice`
- `eventName`
- `eventDate`
- `eventLocation`
- `organizerInbox`
- `socialLinks`
- `submittedAt`

## 6. Uzupełnij przed startem

Przed uruchomieniem wpisz do skryptu:
- prawdziwego odbiorcę przelewu,
- prawdziwy numer konta,
- linki do kolejnych sociali, jeśli chcesz dodać więcej niż Instagram,
- ewentualny termin płatności,
- finalną nazwę arkusza, jeśli jest inna niż `RejsFestZapisy`.
