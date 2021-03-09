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

const organization = setOrganization({ name: "choi", country: "Korea" });

function getOrganization() {
  return organization;
}

function setOrganization(arg) {
  const organization = new Organization(arg);
  return organization;
}

getOrganization().name = "new name";

console.log(getOrganization().name);
