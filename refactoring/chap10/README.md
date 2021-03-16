# 10-1 Decompose Conditional

- 조건식을 함수로 대체한다.

## 예시

```js
if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}
```

---

# 10-2 Consolidate Conditional Expression

- 조건식은 다르지만 그 결과로 수행하는 코드가 같은 경우 하나로 통합한다.

---

# 10-3 Replace Nested Conditional with Guard Clauses

- 보호 구문은 if else구조로 감싸나가지 않고 if 문을 나열한다.

---

# 10-4 Replace Conditional with Polymorphism

- 복잡한 조건부 로직은 클래스로 만든다.

---

# 10-5
