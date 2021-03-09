class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  get name() {
    return this._name;
  }

  set name(aString) {
    this._data.name = aString;
  }

  get country() {
    return this._country;
  }

  set country(aCountryCode) {
    this.country = aCountryCode;
  }
}

const organization = new Organization({ name: "choi", country: "Korea" });
function getOrganization() {
  return organization;
}

getOrganization().name = "new name";
