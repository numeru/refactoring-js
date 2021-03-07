# Extract Variable

- 표현식이 너무 복잡한 경우 지역 변수로 만들어 쪼갠다.
- 만든 변수가 넓은 문맥에서까지 사용된다면 함수로 추출하는 것을 고려해본다.

---

## 절차

1. 표현식의 일부를 변수로 옮기고 원래 자리를 변수로 대체한다.

---

## 예시

1. 함수 안에서

```js
function price(order) {
  const basePrice = order.quantity * order.itemPrice; // 변수로 만든다.

  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;

  const shipping = Math.min(basePrice * 0.1, 100);

  return basePrice - quantityDiscount + shipping;
}
```

2. 클래스 안에서

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
