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
