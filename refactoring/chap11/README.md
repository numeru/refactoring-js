# 11-1 Separate Query from Modifier

- 질의 함수는 모두 부수효과가 없어야한다.

---

# 11-2 Parameterize Function

- 두 함수의 로직이 거의 비슷하고 단지 리터럴 값만 다르다면, 그 다른 값을 매개변수로 받는 하나의 함수로 합친다.

---

# 11-3 Remove Flag Argument

- 흐름을 제어하기 위해 함수에 넘겨주는 플래그 인수를 제거한다.

---

# 11-4 Preserve Whole Object

- 매개변수들을 하나의 객체에 담아 전달한다.

---

# 11-5 Replace Parameter with Query

- 매개변수를 질의 함수로 바꾼다.

---

# 11-6 Replace Query with Parameter

- 질의 함수를 매개변수로 바꾼다.

---

# 11-7 Remove Setting Method

- 바뀌지 않아야 하는 필드는 setter를 제거한다.

---

# 11-8 Replace Constructor with Factory Function

- 생성자 대신 생성자를 return하는 팩터리 함수를 호출한다.

---

# 11-9 Replace Function with Command

- 함수를 클래스로 바꾸고 명령 메서드를 통해 실행시킨다.

## 예시

```js
function score(a, b, c) {
  //...
}

class Score() {
  constructor(a, b, c) {
    this._a = a;
    this._b = b;
    this._c = c;
  }

  execute() {
    //...(함수와 같은 코드)
  }
}
```

---

# 11-10 Replace Command with Function

- 로직이 복잡하지 않다면 명령을 함수로 바꾼다.

---

# 11-11 Return Modified Value

- 함수 안에서 어떤 변수가 업데이트 될 경우, 값을 return하여 그 사실을 드러낸다.

---

# 11-12 Replace Error Code with Exception

- 임의의 오류코드를 return하는 대신 에러를 던진다.

---

# 11-13 Replace Exception with Precheck

- 문제가 될 수 있는 조건을 미리 검사할 수 있다면, try 대신 if문을 사용한다.
