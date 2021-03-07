function printOwing(invoice) {
  const outstanding = calculateOutstanding(invoice);

  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  printDetails(invoice, outstanding);
}

//**********************************************

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.mount;
  }
  return result;
}

function price(order) {
  const basePrice = order.quantity * order.itemPrice; // 변수로 만든다.

  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;

  const shipping = Math.min(basePrice * 0.1, 100);

  return basePrice - quantityDiscount + shipping;
}

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

//**********************************************
