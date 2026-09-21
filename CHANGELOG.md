# Changelog

## [1.0.0] - 2026-09-21

### Changed

- BREAKING: Removed the `islamic` calendar type to avoid ambiguity, which itself is not a calendar type, but rather a short for `islamic-civil`.
- Migrated to an ESM-only build.
- Improved the benchmark script.
- Expanded edge-case and DST test coverage, and configured tests to run across multiple time zones.

### Performance

Improved `IntlDate.of(calendarType)` performance by 40% for the Gregorian calendar type. For other calendar types, it is now 94× (9,357%) faster on Node.js <26 and older browsers, and 183× (18,215%) faster on Node.js ≥26 and newer browsers.

### Fixed

- Fixed `IntlDate.daysUntil` to count days correctly when a date range crosses a DST transition in the environment's time zone.
- Corrected a typo in the minimum Node.js version declaration; the requirement is unchanged.

## [0.3.0] - 2022-07-16

- IntlDate: added the following methods:
  - getQuarter
  - isEqual
  - isBefore
  - isAfter
  - isBetween
  - daysUntil
  - min
  - max
  - format

## [0.2.1] - 2022-07-14

- Export CalendarType

## [0.2.0] - 2022-07-14

- IntlDate: added the following methods:
  - from
  - parse
  - getDayOfWeek
  - plusDays
  - minusDays
  - toString
- Internal Enhancements

## [0.1.0] - 2022-07-14

First GA release
