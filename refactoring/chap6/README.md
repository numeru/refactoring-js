# 6-1 Extract Function

- 길거나, 다른 곳에서도 사용되거나, 알아보기 어려운 코드는 함수로 묶어 적절한 이름을 지어준다.
- 무엇을 하는지 잘 드러나도록 이름을 붙인다.

## 예시

### 1. 유효범위를 벗어나는 변수가 없을 때

```js
function printOwing(invoice) {
  let outstanding = 0;

  for (const o of invoice.orders) {
    outstanding += o.mount;
  }

  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  printDetails(); // 함수로 묶는다.

  function printDetails() {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
  }
}
```

### 2. 지역 변수를 사용할 때

```js
function printOwing(invoice) {
  let outstanding = 0;

  for (const o of invoice.orders) {
    outstanding += o.mount;
  }

  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  printDetails(invoice, outstanding);
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}
```

### 3. 지역 변수의 값이 변경될 때

```js
function printOwing(invoice) {
  const outstanding = calculateOutstanding(invoice);

  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  printDetails(invoice, outstanding);
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.mount;
  }
  return result;
}
```

---

# 6-2 Inline Function

- 함수 본문이 명확한 경우, 간접 호출을 너무 과하게 쓰는 경우 함수를 제거한다. (extract function과 반대)

---

# 6-3 Extract Variable

- 표현식이 너무 복잡한 경우 지역 변수로 만들어 쪼갠다.
- 만든 변수가 넓은 문맥에서까지 사용된다면 함수로 추출하는 것을 고려해본다.

## 예시

### 1. 함수 안에서

```js
function price(order) {
  const basePrice = order.quantity * order.itemPrice; // 변수로 만든다.

  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;

  const shipping = Math.min(basePrice * 0.1, 100);

  return basePrice - quantityDiscount + shipping;
}
```

### 2. 클래스 안에서

```js
class Order {
  constructor(record) {
    this.data = record;
  }

  get quantity() {
    return this.data.quantity;
  }

  get itemPrice() {
    return this.data.itemPrice;
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }

  // class 전역에서 사용되는 경우 함수로 추출한다.
  get basePrice() {
    return this.quantity * this.itemPrice;
  }

  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }

  get shipping() {
    return Math.min(this.basePrice * 0.1, 100);
  }
}
```

---

# 6-4 Inline Variable

- 변수가 표현식과 다를 바 없을 경우 인라인하는 것이 좋다.

---

# 6-5 Change Function Declaration

- 함수에 명확한 이름을 붙이고, 적절한 매개변수를 전달하는 것이 중요하다.
- 매개변수를 바꾸면 의존성이 제거되어 더 넓은 문맥에서 사용할 수 있다.

## 예시

```js
// 변경 전
function inNewEngland(customer) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(customer.address.state);
}

const newEnglands = customers.filter((c) => inNewEngland(c));

// 변경 후
function inNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(stateCode);
}

const newEnglands = customers.filter((c) => inNewEngland(c.address.state));
```

---

# 6-6 Encapsulate Variable

- 접근 범위가 넓은 데이터를 옮길 때 데이터로의 접근을 독점하는 함수를 만든다.

## 예시

```js
let defaultData = { firstName: "choi", lastName: "yk" };

export function getDefaultData() {
  return defaultData;
}
export function setDefaultData(arg) {
  defaultData = arg;
}
```

---

# 6-7 Rename Variable

- 변수의 목적을 명확히 알 수 있는 이름을 짓는다.

---

# 6-8 Introduce Parameter Object

- 관련있는 여러 매개 변수를 하나의 객체로 묶는다.
- 이 데이터에 공통으로 적용되는 함수를 함께 클래스로 묶을 수 있다.

## 예시

```js
// 기본 구성
const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};

function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || max < r.temp);
}
```

```js
class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}

const range = new NumberRange(
  operationPlan.temperatureFloor,
  operationPlan.temperatureCeiling
);

function readingsOutsideRange(station, range) {
  return station.readings.filter(
    (r) => r.temp < range.min || range.max < r.temp
  );
}
```

---

# 6-9 Combine Function into Class

- 관련 데이터와 함수를 클래스로 묶는다.

## 예시

```js
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }

  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(reading.year));
  }
}

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;
```

---

# 6-10 Combine Functions into Transform

- 같은 도출 로직이 반복될 때 하나의 변환 함수로 만든다.

## 예시

```js
const reading = { customer: "choi", quantity: 10, month: 5, year: 2017 };

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(
    0,
    result.baseCharge - taxThreshold(result.year)
  );
  return result;
}
```

---

# 6-11 Split Phase

- 하나의 동작을 연이은 두 단계로 쪼갠다.

## 예시

```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  // 두번째 함수에 전달될 변수를 중간 객체에 넣는다.
  const priceData = {
    basePrice: basePrice,
    quantity: quantity,
    discount: discount,
  };

  // 함수로 쪼갠다.
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;
  return price;
}
```
