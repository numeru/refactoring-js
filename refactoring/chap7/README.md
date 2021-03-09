# Encapsulate Record

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
