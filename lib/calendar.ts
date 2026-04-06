import { WEDDING } from './constants';

export function generateICS(): string {
  const start = '20260524T053000Z'; // 11:00 IST = 05:30 UTC
  const end = '20260524T083000Z';   // 14:00 IST = 08:30 UTC

  const description = `Wedding Ceremony\\n\\nGroom: ${WEDDING.groom}\\nBride: ${WEDDING.bride}\\n\\nGroom Venue: ${WEDDING.groomVenue.name}\\nMap: ${WEDDING.groomVenue.mapUrl}\\n\\nBride Venue: ${WEDDING.brideVenue.name}\\nMap: ${WEDDING.brideVenue.mapUrl}`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
SUMMARY:${WEDDING.groom} weds ${WEDDING.bride}
DESCRIPTION:${description}
LOCATION:${WEDDING.groomVenue.name} & ${WEDDING.brideVenue.name}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Wedding starts in 30 minutes!
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

export function downloadICS(): void {
  const ics = generateICS();
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding-invitation.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent(`${WEDDING.groom} weds ${WEDDING.bride}`);
  const details = encodeURIComponent(
    `Wedding Ceremony\n\nGroom Venue: ${WEDDING.groomVenue.name}\nMap: ${WEDDING.groomVenue.mapUrl}\n\nBride Venue: ${WEDDING.brideVenue.name}\nMap: ${WEDDING.brideVenue.mapUrl}`
  );
  const location = encodeURIComponent(`${WEDDING.groomVenue.name} & ${WEDDING.brideVenue.name}`);
  const dates = '20260524T053000Z/20260524T083000Z';

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
}
