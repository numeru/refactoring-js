# 12-1 Pull Up Method

- 두 클래스에 중복되는 메서드가 있을 경우 슈퍼(부모) 클래스로 올린다.

---

# 12-2 Pull Up Field

- 두 클래스에 중복되는 데이터가 있을 경우 슈퍼 클래스로 올린다.

---

# 12-3 Pull Up Constructor Body

- 두 클래스의 생성자 안에 동일하게 생성되는 데이터가 있을 경우 슈퍼 클래스로 올린다.

---

# 12-4 Push Down Method

- 특정 서브 클래스 하나와만 관련된 메서드는 슈퍼 클래스에서 제거한다.

---

# 12-5 Push Down Field

- 특정 서브 클래스 하나와만 관련된 데이터는 슈퍼 클래스에서 제거한다.

---

# 12-6 Replace Type Code with Subclasses

- 슈퍼 클래스의 팩터리 함수에서 타입코드에 따라 다른 서브 클래스의 생성자를 return한다.

## 예시

```js
class Employee {
  constructor(name) {
    this._name = name;
  }
}

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Enginner(name);
    case "salesperson":
      return new Salesperson(name);
    case "manager":
      return new Manager(name);
    default:
      throw new Error(`${type}라는 직원 유형은 없습니다.`);
  }
}
```

---

# 12-7 Remove Subclass

- 서브 클래스들이 더이상 쓰이지 않거나 다른 모듈로 이동한 경우, 슈퍼 클래스의 필드로 대체한다.

---

# 12-8 Extract Superclass

- 두 클래스의 중복되는 부분을 추출하여 필드 올리기나 메서드 올리기를 통해 슈퍼클래스를 만든다.

---

# 12-9 Collapse Hierarchy

- 계층구조의 두 클래스가 독립적으로 존재할 의미가 없는 경우, 하나로 합친다.

---

# 12-10 Replace Subclass with Delegate

- 상속은 서브클래스를 나누는 기준이 하나이고, 클래스들이 긴밀하게 결합하는 단점이 있다.
- 위임은 이를 보완한다.

- 자식 클래스가 슈퍼 클래스를 모두 포함하면서, 그 이상으로 특정 기능을 수행하는 경우.
- 슈퍼 클래스에 자식 클래스를 넣고, 자식 클래스의 객체를 만들 때 대신 슈퍼 클래스를 호출한다.

## 예시

```js
class Booking {
  constructor(show, data) {
    this._show = show;
    this._data = data;
  }

  //...

  // 슈퍼 클래스인 Booking 안에서 Premium이 될지 말지를 정한다.
  _bePremium(extra) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

function createBooking(show, data) {
  return new Booking(show, data);
}

class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }

  //...
}

function createPremiumBooking(show, data, extras) {
  // Premium Booking을 만들 때 Booking을 만들고 추가적으로 Premium을 연결하여준다.
  const result = new Booking(show, data, extras);
  result._bePremium(extras);
  return result;
}

// class PremiumBooking extends Booking{
//   ...
// }
```

---

# Replace Superclass with Delegate

- 자식 클래스가 슈퍼 클래스를 속성으로서 재활용하고 싶은 경우.
- 슈퍼 클래스의 객체는 필요하지 않은 경우.(위임 객체의 역할을 하는 경우)
- 자식 클래스에 슈퍼 클래스를 넣고, 자식 클래스의 객체가 슈퍼 클래스를 이용한다.

## 예시

```js
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  //...
}

class Scroll {
  constructor(id, title, tags, dataLastCleaned) {
    // scroll이 catalogitem의 속성을 가진다.
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dataLastCleaned;
  }
}

// class Scroll extends CatalogItem {
//   ...
// }
```
