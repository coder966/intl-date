# Intl Date

Javascript library to represent and work with dates in different calendar systems (e.g. hijri, persian and others).

## Features

- Simple and type-safe API
- Immutable objects
- Supports 7 calendar systems
- Zero dependencies. Uses the native `Intl.DateTimeFormat` under the hood.

## Supported Calendars

- gregorian
- islamic
- islamic-umalqura
- islamic-rgsa
- islamic-civil
- islamic-tbla
- persian

## Example

```javascript
const date = IntlDate.of('islamic-umalqura', 1377, 3, 22);

date.getYear('gregorian'); // 1957
date.getMonth('gregorian'); // 10
date.getDay('gregorian'); // 16

date.getYear('islamic-umalqura'); // 1377
date.getMonth('islamic-umalqura'); // 3
date.getDay('islamic-umalqura'); // 22

date.getYear('persian'); // 1336
date.getMonth('persian'); // 7
date.getDay('persian'); // 24
```

## API

### of

```javascript
const date = IntlDate.of('islamic-umalqura', 1377, 3, 22);
```

### today

```javascript
const date = IntlDate.today();
```

### getYear

```javascript
const year = date.getYear('islamic-umalqura');
```

### getMonth

```javascript
const month = date.getMonth('gregorian');
```

### getDay

```javascript
const day = date.getDay('persian');
```

### getDayOfWeek

```javascript
const dayOfWeek = date.getDayOfWeek();
```

### toString

```javascript
const date = IntlDate.of('gregorian', 2022, 7, 11);
const formattedString = date.toString('gregorian'); // 2022-07-11
```

### plusDays

```javascript
const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
const newDate = oldDate.plusDays(20);

// old shouldn't be modified
oldDate.getYear('gregorian'); // 1957
oldDate.getMonth('gregorian'); // 10
oldDate.getDay('gregorian'); // 16

newDate.getYear('gregorian'); // 1957
newDate.getMonth('gregorian'); // 11
newDate.getDay('gregorian'); // 5
```

### minusDays

```javascript
const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
const newDate = oldDate.minusDays(20);

// old shouldn't be modified
oldDate.getYear('gregorian'); // 1957
oldDate.getMonth('gregorian'); // 10
oldDate.getDay('gregorian'); // 16

newDate.getYear('gregorian'); // 1957
newDate.getMonth('gregorian'); // 9
newDate.getDay('gregorian'); // 26
```

## License

```txt
Copyright 2022 Khalid H. Alharisi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
