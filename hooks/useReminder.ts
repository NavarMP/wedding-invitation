'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { downloadICS } from '@/lib/calendar';
import { WEDDING } from '@/lib/constants';
import type { Translations } from '@/lib/i18n';

type ReminderOptionId = '30m' | '1h' | '1d';
type ReminderDelivery = 'browser' | 'calendar';
type ReminderFallback = 'unsupported' | 'denied' | null;

interface ReminderRecord {
  optionId: ReminderOptionId;
  minutesBefore: number;
  triggerAt: number;
  delivery: ReminderDelivery;
  fallbackReason: ReminderFallback;
}

interface ReminderToast {
  message: string;
  delivery: ReminderDelivery;
}

interface ReminderOption {
  id: ReminderOptionId;
  label: string;
  minutesBefore: number;
}

const REMINDER_STORAGE_KEY = 'wedding-reminder-config';
const LEGACY_REMINDER_KEY = 'wedding-reminder-set';

function getReminderOptions(translations: Translations): ReminderOption[] {
  return [
    { id: '30m', label: translations.reminderThirtyMinutes, minutesBefore: 30 },
    { id: '1h', label: translations.reminderOneHour, minutesBefore: 60 },
    { id: '1d', label: translations.reminderOneDay, minutesBefore: 1440 },
  ];
}

function getReminderLabel(optionId: ReminderOptionId, translations: Translations) {
  return getReminderOptions(translations).find((option) => option.id === optionId)?.label ?? '';
}

function supportsBrowserNotifications() {
  return typeof window !== 'undefined' && window.isSecureContext && 'Notification' in window;
}

function isStoredReminder(value: unknown): value is ReminderRecord {
  if (!value || typeof value !== 'object') return false;

  const record = value as Partial<ReminderRecord>;
  return (
    (record.optionId === '30m' || record.optionId === '1h' || record.optionId === '1d') &&
    typeof record.minutesBefore === 'number' &&
    typeof record.triggerAt === 'number' &&
    (record.delivery === 'browser' || record.delivery === 'calendar')
  );
}

function getStoredReminder(): ReminderRecord | null {
  if (typeof window === 'undefined') return null;

  localStorage.removeItem(LEGACY_REMINDER_KEY);

  const rawValue = localStorage.getItem(REMINDER_STORAGE_KEY);
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue);
    if (!isStoredReminder(parsed) || parsed.triggerAt <= Date.now()) {
      localStorage.removeItem(REMINDER_STORAGE_KEY);
      return null;
    }

    if (parsed.delivery === 'browser' && (!supportsBrowserNotifications() || Notification.permission !== 'granted')) {
      localStorage.removeItem(REMINDER_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    localStorage.removeItem(REMINDER_STORAGE_KEY);
    return null;
  }
}

export function useReminder(translations: Translations) {
  const [activeReminder, setActiveReminder] = useState<ReminderRecord | null>(getStoredReminder);
  const [toast, setToast] = useState<ReminderToast | null>(null);
  const notificationTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const reminderOptions = getReminderOptions(translations);

  const clearScheduledNotification = useCallback(() => {
    if (notificationTimerRef.current) {
      window.clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }
  }, []);

  const clearToast = useCallback(() => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((message: string, delivery: ReminderDelivery) => {
    clearToast();
    setToast({ message, delivery });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 4500);
  }, [clearToast]);

  const scheduleBrowserReminder = useCallback((record: ReminderRecord) => {
    clearScheduledNotification();

    const delay = record.triggerAt - Date.now();
    if (delay <= 0 || !supportsBrowserNotifications() || Notification.permission !== 'granted') {
      return;
    }

    notificationTimerRef.current = window.setTimeout(() => {
      const notification = new Notification(
        `${WEDDING.groom} ${translations.weds} ${WEDDING.bride}`,
        {
          body: `${translations.weddingCeremony} · ${translations.dateTime}`,
          icon: '/favicon.ico',
          tag: 'wedding-reminder',
        }
      );

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      localStorage.removeItem(REMINDER_STORAGE_KEY);
      setActiveReminder(null);
      notificationTimerRef.current = null;
    }, delay);
  }, [clearScheduledNotification, translations.dateTime, translations.weddingCeremony, translations.weds]);

  const statusNote =
    activeReminder?.delivery === 'browser'
      ? `${translations.reminderSetBrowser} ${getReminderLabel(activeReminder.optionId, translations)}.`
      : activeReminder?.fallbackReason === 'unsupported'
        ? translations.reminderUnsupported
        : activeReminder?.fallbackReason === 'denied'
          ? translations.reminderDenied
          : activeReminder
            ? `${translations.reminderSetCalendar} ${getReminderLabel(activeReminder.optionId, translations)}.`
            : null;

  const persistReminder = useCallback((record: ReminderRecord) => {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(record));
    setActiveReminder(record);
  }, []);

  const setReminder = useCallback(async (optionId: ReminderOptionId) => {
    const option = reminderOptions.find((item) => item.id === optionId);
    if (!option) return;

    const triggerAt = WEDDING.targetDate.getTime() - option.minutesBefore * 60 * 1000;

    if (supportsBrowserNotifications()) {
      let permission = Notification.permission;

      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }

      if (permission === 'granted') {
        const record: ReminderRecord = {
          optionId,
          minutesBefore: option.minutesBefore,
          triggerAt,
          delivery: 'browser',
          fallbackReason: null,
        };

        persistReminder(record);
        showToast(`${translations.reminderSetBrowser} ${option.label}.`, 'browser');
        return;
      }

      downloadICS(option.minutesBefore);
      const record: ReminderRecord = {
        optionId,
        minutesBefore: option.minutesBefore,
        triggerAt,
        delivery: 'calendar',
        fallbackReason: 'denied',
      };

      persistReminder(record);
      showToast(`${translations.reminderSetCalendar} ${option.label}.`, 'calendar');
      return;
    }

    downloadICS(option.minutesBefore);
    const record: ReminderRecord = {
      optionId,
      minutesBefore: option.minutesBefore,
      triggerAt,
      delivery: 'calendar',
      fallbackReason: 'unsupported',
    };

    persistReminder(record);
    showToast(`${translations.reminderSetCalendar} ${option.label}.`, 'calendar');
  }, [persistReminder, reminderOptions, showToast, translations]);

  useEffect(() => {
    if (activeReminder?.delivery === 'browser') {
      scheduleBrowserReminder(activeReminder);
    } else {
      clearScheduledNotification();
    }
  }, [activeReminder, clearScheduledNotification, scheduleBrowserReminder]);

  useEffect(() => () => {
    clearScheduledNotification();
    clearToast();
  }, [clearScheduledNotification, clearToast]);

  return {
    activeReminder,
    reminderOptions,
    setReminder,
    toast,
    statusNote,
    clearToast,
  };
}
