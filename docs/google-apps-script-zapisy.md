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
const SHEET_NAME = "Arkusz1";
const ORGANIZER_EMAIL = "rejsfest@gmail.com";
const REPLY_TO = "rejsfest@gmail.com";

function doGet(e) {
  try {
    if (!e || !e.parameter || !e.parameter.data) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: "Brak parametru data." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const payload = JSON.parse(e.parameter.data);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Nie znaleziono zakładki arkusza: " + SHEET_NAME);
    }

    sheet.appendRow([
      new Date(),
      payload.fullName || "",
      payload.email || "",
      payload.birthDate || "",
      payload.ticketPrice || "50 zł",
      "nowy",
      ORGANIZER_EMAIL,
    ]);

    const organizerSubject = "Nowe zgłoszenie - Rejs Fest 2026";
    const organizerBody =
      "Nowe zgłoszenie:\n\n" +
      "Imię i nazwisko: " + (payload.fullName || "") + "\n" +
      "E-mail: " + (payload.email || "") + "\n" +
      "Data urodzenia: " + (payload.birthDate || "") + "\n" +
      "Cena: " + (payload.ticketPrice || "50 zł") + "\n";

    MailApp.sendEmail({
      to: ORGANIZER_EMAIL,
      subject: organizerSubject,
      body: organizerBody,
      replyTo: payload.email || REPLY_TO,
    });

    const participantSubject = "Rejs Fest 2026 - potwierdzenie zapisu";
    const participantBody =
      "Hej!\n\n" +
      "Dzięki za zapis na Rejs Fest 2026.\n" +
      "Twoje zgłoszenie zostało przyjęte.\n\n" +
      "Data: 29 sierpnia 2026\n" +
      "Miejsce: Białystok, Parafia NSM na Dojlidach\n" +
      "Koszt udziału: 50 zł\n\n" +
      "Dane do przelewu:\n" +
      "Odbiorca: [uzupełnij]\n" +
      "Numer konta: [uzupełnij]\n" +
      "Tytuł przelewu: Rejs Fest 2026 - " + (payload.fullName || "") + "\n\n" +
      "W razie pytań pisz na: rejsfest@gmail.com\n";

    MailApp.sendEmail({
      to: payload.email,
      subject: participantSubject,
      body: participantBody,
      replyTo: REPLY_TO,
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
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
PUBLIC_REGISTRATION_WEBHOOK_URL=TU_WKLEJ_URL_Z_GOOGLE_APPS_SCRIPT
```

Ta zmienna jest już obsłużona przez formularz w:
- [FinalCtaSection.tsx](/Users/mlenqe/Desktop/RejsFestAstro/rejs-fest-astro/src/app/components/landing/FinalCtaSection.tsx)

## 5. Co robi front

Po kliknięciu `Potwierdzam zapis` formularz:
- waliduje dane,
- wysyła je do `PUBLIC_REGISTRATION_WEBHOOK_URL` przez `GET ?data=...`,
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
- `submittedAt`

## 6. Uzupełnij przed startem

Przed uruchomieniem wpisz do skryptu:
- prawdziwego odbiorcę przelewu,
- prawdziwy numer konta,
- ewentualny termin płatności,
- finalną nazwę arkusza, jeśli jest inna niż `Arkusz1`.
