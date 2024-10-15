export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: 'CASH' | 'COUPON';
  percentage?: number;
  amount?: number;
};

export function charge(invoice: Invoice, payments: Payment[]): Receipt {
  const total = invoice.total;

  const { deposit, cashPayment } = payments.reduce(
    (acc, payment) => {
      let newDeposit = acc.deposit;
      let newCashPayment = acc.cashPayment;

      if (payment.type === 'COUPON') {
        newDeposit += payment.percentage != null
          ? Math.floor(total * (payment.percentage / 100))
          : (payment.amount ?? 0);
      } else {
        newCashPayment += payment.amount ?? 0;
        newDeposit += payment.amount ?? 0;
      }

      if (newDeposit > total) {
        throw new Error('OverCharge');
      }

      return { deposit: newDeposit, cashPayment: newCashPayment };
    },
    { deposit: 0, cashPayment: 0 }
  );

  if (deposit < total) {
    throw new Error('Shortage');
  }

  const change = cashPayment > 0 ? deposit - total : 0;

  return { total, deposit, change };
}
