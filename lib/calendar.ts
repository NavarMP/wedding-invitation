import { WEDDING } from './constants';

function getAlarmTrigger(minutesBefore: number): string {
  if (minutesBefore >= 1440 && minutesBefore % 1440 === 0) {
    return `-P${minutesBefore / 1440}D`;
  }

  if (minutesBefore >= 60 && minutesBefore % 60 === 0) {
    return `-PT${minutesBefore / 60}H`;
  }

  return `-PT${minutesBefore}M`;
}

function getReminderSuffix(minutesBefore: number): string {
  if (minutesBefore >= 1440 && minutesBefore % 1440 === 0) {
    return `${minutesBefore / 1440}d`;
  }

  if (minutesBefore >= 60 && minutesBefore % 60 === 0) {
    return `${minutesBefore / 60}h`;
  }

  return `${minutesBefore}m`;
}

export function generateICS(reminderMinutesBefore = 30): string {
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
TRIGGER:${getAlarmTrigger(reminderMinutesBefore)}
ACTION:DISPLAY
DESCRIPTION:Wedding reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;
}

export function downloadICS(reminderMinutesBefore = 30): void {
  const ics = generateICS(reminderMinutesBefore);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wedding-invitation-${getReminderSuffix(reminderMinutesBefore)}.ics`;
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
