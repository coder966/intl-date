# Intl Date

Javascript library to represent and work with dates in different calendar systems (e.g. hijri, persian and others).

## Features

- Simple and type-safe API
- Immutable objects
- Supports 7 calendar systems
- Zero dependencies. Leverages `Intl.DateTimeFormat`.

## Supported Calendars

- gregorian
- islamic
- islamic-umalqura
- islamic-rgsa
- islamic-civil
- islamic-tbla
- persian

## Installation

```shell
$ npm install intl-date
```

## Example

```javascript
const date = IntlDate.of('islamic-umalqura', 1377, 3, 22);

date.toString('gregorian'); // 1957-10-16
date.getYear('gregorian'); // 1957
date.getMonth('gregorian'); // 10
date.getDay('gregorian'); // 16

date.toString('islamic-umalqura'); // 1377-03-22
date.getYear('islamic-umalqura'); // 1377
date.getMonth('islamic-umalqura'); // 3
date.getDay('islamic-umalqura'); // 22

date.toString('persian'); // 1336-07-24
date.getYear('persian'); // 1336
date.getMonth('persian'); // 7
date.getDay('persian'); // 24
```

## API

### Different ways to create IntlDate objects

#### of - Create IntlDate from a year, month, and day

```javascript
const date = IntlDate.of('islamic-umalqura', 1377, 3, 22);
```

#### from - Create IntlDate from a Javascript Date object

```javascript
const jsDate = new Date(2017, 11, 25);
const intlDate = IntlDate.from(jsDate);
```

#### parse - Create IntlDate from a string

```javascript
const date = IntlDate.parse('gregorian', '1957-05-16');
```

#### today - Create IntlDate for today's date

```javascript
const date = IntlDate.today();
```

### Getters

#### getYear

```javascript
const year = date.getYear('islamic-umalqura');
```

#### getMonth

```javascript
const month = date.getMonth('gregorian');
```

#### getDay

```javascript
const day = date.getDay('persian');
```

#### getDayOfWeek

```javascript
const dayOfWeek = date.getDayOfWeek();
```

#### getQuarter

```javascript
const quarter = date.getQuarter('gregorian');
```

### Manipulative operations (produces new immutable IntlDate objects)

#### plusDays

```javascript
const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
const newDate = oldDate.plusDays(20);

oldDate.toString('gregorian'); // 1957-10-16
newDate.toString('gregorian'); // 1957-11-05
```

#### minusDays

```javascript
const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
const newDate = oldDate.minusDays(20);

oldDate.toString('gregorian'); // 1957-10-16
newDate.toString('gregorian'); // 1957-09-26
```

### Comparing IntlDate objects

#### isEqual

```javascript
const date1 = IntlDate.of('gregorian', 1957, 10, 16);
const date2 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
const result = date1.isEqual(date2); // true
```

#### isBefore

```javascript
const date1 = IntlDate.of('gregorian', 1957, 10, 15);
const date2 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
const result = date1.isBefore(date2); // true
```

#### isAfter

```javascript
const date1 = IntlDate.of('gregorian', 1957, 10, 17);
const date2 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
const result = date1.isAfter(date2); // true
```

#### isBetween

```javascript
const date1 = IntlDate.of('gregorian', 1957, 10, 16);
const date2 = IntlDate.of('gregorian', 1957, 10, 20);
const date3 = IntlDate.of('gregorian', 1957, 10, 25);
const result = date2.isBetween(date1, date3); // true
```

#### daysUntil

```javascript
const date1 = IntlDate.of('gregorian', 1957, 10, 16);
const date2 = IntlDate.of('gregorian', 1957, 11, 20);
const days = date1.daysUntil(date2); // 35
```

#### min

```javascript
const date1 = IntlDate.of('gregorian', 1957, 10, 16);
const date2 = IntlDate.of('gregorian', 1957, 10, 20);
const min = IntlDate.min(date1, date2); // date1
```

#### max

```javascript
const date1 = IntlDate.of('gregorian', 1957, 10, 16);
const date2 = IntlDate.of('gregorian', 1957, 10, 20);
const max = IntlDate.max(date1, date2); // date2
```

### String operations

#### format

```javascript
const date = IntlDate.of('gregorian', 2022, 7, 11);
const formattedString = date.format('gregorian', 'yyyy-MM-dd'); // 2022-07-11
```

#### toString

```javascript
const date = IntlDate.of('gregorian', 2022, 7, 11);
const string = date.toString('gregorian'); // 2022-07-11
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
