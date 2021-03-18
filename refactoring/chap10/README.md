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

# 10-5 Intoduce Special Case

- 특정 상황에서 같은 동작을 하는 코드가 여러 곳에 있을 경우, 하나의 특이 케이스로 묶는다.

---

# 10-6 Introduce Assertion

- 특정 가정이 코드에 항상 명시되게하여, 오류를 찾고 가정된 상태를 다른이에게 알린다.

## 예시

```js
class Customer {
  applyDiscount(num) {
    if (!this.discountRate) return num;
    else {
      assert(thus.discountRate >= 0);
      return num - this.discountRate * num;
    }
  }
}
```

---

# 10-7 Replace Control Flag with Break

- 특정 상황을 확인하기 위해 쓰이는 제어 플래그는 제거하는 것이 좋다.

--
