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

### of

```javascript
const date = IntlDate.of('islamic-umalqura', 1377, 3, 22);
```

### from

```javascript
const jsDate = new Date(2017, 11, 25);
const intlDate = IntlDate.from(jsDate);
```

### parse

```javascript
const date = IntlDate.parse('gregorian', '1957-05-16');
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

oldDate.toString('gregorian'); // 1957-10-16
newDate.toString('gregorian'); // 1957-11-05
```

### minusDays

```javascript
const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
const newDate = oldDate.minusDays(20);

oldDate.toString('gregorian'); // 1957-10-16
newDate.toString('gregorian'); // 1957-09-26
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
