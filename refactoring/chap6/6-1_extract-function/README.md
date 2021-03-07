# Extract Function

- 길거나, 다른 곳에서도 사용되거나, 알아보기 어려운 코드는 함수로 묶어 적절한 이름을 지어준다.

---

## 절차

### 1. 함수를 새로 만들고 무엇을 하는지 잘 드러나도록 이름을 붙인다.

- 코드가 간단하더라도 함수로 뽑았을 때 목적이 더 잘 드러난다면 추출한다.
- 반대로 이름이 떠오르지 않는다면 추출하지 않는다.

### 2. 코드를 추출하여 함수에 붙여넣고, 유효범위를 벗어난 변수는 없는지 검사한다.

- 있다면 매개변수로 전달한다.

### 3. 기존의 코드가 있던 곳에서 함수를 호출한다.

---

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
