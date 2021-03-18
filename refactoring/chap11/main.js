class Customer {
  applyDiscount(num) {
    if (!this.discountRate) return num;
    else {
      assert(thus.discountRate >= 0);
      return num - this.discountRate * num;
    }
  }
}
