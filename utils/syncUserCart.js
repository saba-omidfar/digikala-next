export default function syncUserCart(user, cart) {
  user.cart = {
    items_count: cart?.items_count || 0,
    payable_price: cart?.payable_price || 0,
    rrp_price: cart?.rrp_price || 0,
    rrp_price_total: cart?.rrp_price_total || 0,
    items_discount: cart?.items_discount || 0,
    total_discount: cart?.total_discount || 0,

    insurance: {
      amount: cart?.insurance?.amount || 0,
      rrp_price: cart?.insurance?.rrp_price || 0,
      discount: cart?.insurance?.discount || 0,
    },

    temporary_plus_subscription: {
      title: "",
      rrp_price: 0,
      payable_price: 0,
      discount: 0,
    },
  };

  return user;
}
