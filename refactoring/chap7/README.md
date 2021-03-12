# 7-1 Encapsulate Record

- 가변 데이터를 저장할 때 클래스에 담는다.

## 예시

```js
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  get name() {
    return this._name;
  }

  set name(aString) {
    this._name = aString;
  }

  get country() {
    return this._country;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

const organization = new Organization({ name: "choi", country: "Korea" });

// 변수 캡슐화
function getOrganization() {
  return organization;
}

getOrganization().name = "new name";
```

---

# 7-2 Encapsulate Collection

- 컬렉션 자체를 바꾸는 setter는 제거하고 추가, 삭제 함수를 만든다.

## 예시

```js
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    // 복사본 전달
    return this._courses.slice();
  }

  // set courses(list) {this._courses = list};
  addCourse(course) {
    this._courses.push(course);
  }
  removeCourse(
    course,
    ifAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this.courses.indexOf(course);
    if (index === -1) ifAbsent();
    else this.courses.splice(index, 1);
  }
}
```

---

# 7-3 Replace Primitive with Object

- 따로 값 클래스를 만들어 getter와 setter를 통해 변수를 사용할 수 있도록 한다.

## 예시

```js
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
  }
}
class Order {
  constructor(data) {
    this._priority = data.priority;
  }
  get priorityString() {
    return this._priority.toString();
  }
  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

// client
highPriorityCount = orders.filter(
  (o) => "high" === o.priorityString || "rush" === o.priorityString
).length;
```

---

# 7-4 임시 변수를 질의 함수로 바꾸기

- 어떤 코드의 결과값을 뒤에서 다시 참조할 목적로 임시변수를 쓴다.
- 이 때 코드를 함수로 만든다.

## 예시

```js
class Order {
  ...
  get price() {
    const basePrice = this.basePrice;
    ...
  }
  get basePrice() {
    return this._quantity * this._item.price;
  }
}
```

---

# 7-5 Extract Class

- 클래스는 반드시 명확하게 추상화하고 소수의 주어진 역할만 처리해야한다.
- 비대해진 클래스는 적절히 분리해준다.

## 예시

```js
class Person {
  constructor() {
    // 생성자에서 분리한 class의 instance를 만든다.
    this._telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }
}

// 분리한 class
class TelephoneNumber {
  get areaCode() {
    return this._officeAreaCode;
  }
  set areaCode(arg) {
    this._telephoneNumber = arg;
  }
}
```

---

# 7-6 Inline Class

- 남은 역할이 거의 없을 때 가장 많이 사용하는 클래스로 흡수시킨다. (Extract Class의 반대 과정)

---

# 7-7 Hide Delegate

- client가 객체의 위임 과정을 알 필요 없도록 위임 메서드를 만들어 준다.

## 예시

```js

// manager = person.department.manager;
manager = person.manager;

class Person {
  ...
  get manager() {
    return this.department.manager;
  }
}
```

---

# 7-8 Remove Middle Man

- 계속해서 위임 메서드를 추가할 수 없기 때문에, 중개자를 제거한다. (Hide Delegate의 반대 과정)

---

# 7-9 알고리즘 교체하기

- 더 간명한 알고리즘을 찾아 교체한다.
