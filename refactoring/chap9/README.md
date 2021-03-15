# 9-1 Split Variable

- 루프변수와 수집변수를 제외한 다른 변수는 대입이 두번 이상 이루어져서는 안된다.
- 두가지 이상의 역할을 할 경우 다른 변수로 쪼갠다.

---

# 9-2 Rename Field

- 필드의 이름을 이해하기 쉽도록 적절히 바꾸어 준다.

---

# 9-3 Replace Derived Variable with Query

- 가변 데이터가 여러 곳에 영향을 주지 않도록 한다.
- 최대한 적은 곳에 사용되도록 한다.

---

# 9-4 Change Reference to Value

- 값을 이용할 경우, 다른 곳에 끼칠 영향을 생각하지 않고 편하게 사용할 수 있다.

---

# 9-5 Change Value to Reference

- 여러 곳에서 값을 공유할 경우, 일관 된 값을 갖도록 참조를 이용한다.

---

# 9-6 Replace Magic Literal

- 일반적인 리터럴 값은 상수로 대체한다. (9.8 = STANDARD_GRAVITY)
