import { charge, Invoice, Payment, Receipt } from './charge';

describe('charge', () => {
  const invoice: Invoice = { total: 1000 }
  it('現金で過不足なく支払う', () => {
    const payments: Payment[] = [{ type: 'CASH', amount: 1000 }];
    const receipt: Receipt = charge(invoice, payments);
    expect(receipt).toEqual({ total: 1000, deposit: 1000, change: 0 });
  });

  it('現金で不足している', () => {
    const payments: Payment[] = [{ type: 'CASH', amount: 500 }];
    expect(() => charge(invoice, payments)).toThrow('Shortage');
  });

  it('現金で過払い', () => {
    const payments: Payment[] = [{ type: 'CASH', amount: 1500 }];
    expect(() => charge(invoice, payments)).toThrow('OverCharge');
  });

  it('商品券(金額)で過不足なく支払う', () => {
    const payments: Payment[] = [{ type: 'COUPON', amount: 1000 }];
    const receipt: Receipt = charge(invoice, payments);
    expect(receipt).toEqual({ total: 1000, deposit: 1000, change: 0 });
  });

  it('商品券(割引率)で過不足なく支払う', () => {
    const payments: Payment[] = [{ type: 'COUPON', percentage: 100 }];
    const receipt: Receipt = charge(invoice, payments);
    expect(receipt).toEqual({ total: 1000, deposit: 1000, change: 0 });
  });

  it('商品券で不足している', () => {
    const payments: Payment[] = [{ type: 'COUPON', amount: 500 }];
    expect(() => charge(invoice, payments)).toThrow('Shortage');
  });

  it('商品券(金額)で過払い', () => {
    const payments: Payment[] = [{ type: 'COUPON', amount: 1500 }];
    expect(() => charge(invoice, payments)).toThrow('OverCharge');
  });

  it('商品券(割引率)で過払い', () => {
    const payments: Payment[] = [{ type: 'COUPON', percentage: 150 }];
    expect(() => charge(invoice, payments)).toThrow('OverCharge');
  });

  it('現金と商品券の組み合わせで過不足なく支払う', () => {
    const payments: Payment[] = [{ type: 'CASH', amount: 500 }, { type: 'COUPON', amount: 500 }];
    const receipt: Receipt = charge(invoice, payments);
    expect(receipt).toEqual({ total: 1000, deposit: 1000, change: 0 });
  });


 it('現金と商品券の組み合わせで過払い', () => {
    const payments: Payment[] = [{ type: 'CASH', amount: 500 }, { type: 'COUPON', amount: 1000 }];
    expect(() => charge(invoice, payments)).toThrow('OverCharge');
  });

  it('複数人で現金で支払う', () => {
    const payments: Payment[] = [{ type: 'CASH', amount: 300 }, { type: 'CASH', amount: 700 }];
    const receipt: Receipt = charge(invoice, payments);
    expect(receipt).toEqual({ total: 1000, deposit: 1000, change: 0 });
  });

});

