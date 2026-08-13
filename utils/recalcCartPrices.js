export default function recalcCartPrices(cart) {
  if (!cart?.packages) {
    return {
      items_count: 0,
      payable_price: 0,
      rrp_price: 0,
      rrp_price_total: 0,
      items_discount: 0,
      total_discount: 0,
      insurance: {
        amount: 0,
        rrp_price: 0,
        discount: 0,
      },
      temporary_plus_subscription: {
        title: "",
        rrp_price: 0,
        payable_price: 0,
        discount: 0,
      },
      basket: [],
      nextPurchaseBasket: [],
    };
  }

  const basket = cart.packages.flatMap((pkg) => pkg.cart_items || []);

  const nextPurchaseBasket = cart.next_cart || [];

  let itemsCount = 0;
  let productsPayablePrice = 0;
  let productsRrpPrice = 0;
  let insuranceAmount = 0;
  let insuranceRrpPrice = 0;

  for (const item of basket) {
    const price = item._price || item.price;
    const qty = Number(item.quantity) || 1;

    // itemsCount += qty;
    itemsCount = basket?.length;

    // productsPayablePrice += (Number(item.price?.selling_price) || 0) * qty;
    // productsRrpPrice += (Number(item.price?.rrp_price) || 0) * qty;

    productsPayablePrice += (Number(price?.selling_price) || 0) * qty;
    productsRrpPrice += (Number(price?.rrp_price) || 0) * qty;

    if (item.has_insurance) {
      insuranceAmount +=
        (Number(item.variant?.insurance?.total_premium) || 0) * qty;

      insuranceRrpPrice +=
        (Number(item.variant?.insurance?.before_discount) || 0) * qty;
    }
  }

  const plusPlan = cart.temporary_plus_subscription || {
    title: "",
    rrp_price: 0,
    payable_price: 0,
    discount: 0,
  };

  cart.items_count = itemsCount;

  cart.rrp_price = productsRrpPrice;

  cart.insurance = {
    amount: insuranceAmount,
    rrp_price: insuranceRrpPrice,
    discount: 0,
  };

  cart.rrp_price_total =
    productsRrpPrice + insuranceRrpPrice + (Number(plusPlan.rrp_price) || 0);

  cart.payable_price =
    productsPayablePrice +
    insuranceAmount +
    (Number(plusPlan.payable_price) || 0);

  cart.items_discount = productsRrpPrice - productsPayablePrice;

  cart.total_discount = cart.rrp_price_total - cart.payable_price;

  cart.discount_percent =
    cart.rrp_price_total > 0
      ? Math.round((cart.total_discount / cart.rrp_price_total) * 100)
      : 0;

  return {
    cart,
    basket,
    nextPurchaseBasket,
  };
}
