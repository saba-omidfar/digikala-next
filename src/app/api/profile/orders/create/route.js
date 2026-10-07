import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";

import { hydrateItems } from "@/lib/cart";

export const runtime = "nodejs";

const getImageUrl = (product) =>
  product?.images?.main?.url?.[0] || product?.images?.main?.webp_url?.[0] || "";

const createNumericId = () => Math.floor(100000000 + Math.random() * 900000000);

export async function POST() {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "لطفا وارد حساب کاربری خود شوید",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
      is_logged_in: true,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    const defaultAddress = user.addresses?.find(
      (address) => address.is_default,
    );

    if (!defaultAddress) {
      return Response.json(
        {
          success: false,
          message: "لطفا یک آدرس برای ارسال انتخاب کنید",
        },
        { status: 400 },
      );
    }

    const cart = await CartModel.findOne({
      userId: user._id,
    }).lean();

    if (!cart) {
      return Response.json(
        {
          success: false,
          message: "سبد خرید پیدا نشد",
        },
        { status: 404 },
      );
    }

    const cartItems = cart.packages?.[0]?.cart_items || [];

    if (!cartItems.length) {
      return Response.json(
        {
          success: false,
          message: "سبد خرید خالی است",
        },
        { status: 400 },
      );
    }

    const items = await hydrateItems(cartItems);

    if (
      items.length !== cartItems.length ||
      items.some((item) => !item.product?.id || !item.variant?.id)
    ) {
      return Response.json(
        {
          success: false,
          message: "اطلاعات بعضی از کالاها قابل دریافت نیست",
        },
        { status: 400 },
      );
    }

    let orderCode;

    do {
      orderCode = String(createNumericId());
    } while (await OrderModel.exists({ order_code: orderCode }));

    const orderItems = items.map((item) => ({
      id: createNumericId(),

      product: item.product,
      variant: item.variant,

      quantity: item.quantity,

      price: item.price,

      has_insurance: Boolean(item.has_insurance),

      returned_quantity: 0,
      cancelled_quantity: 0,
      gift_order_items: [],
    }));

    const productImages = items.map((item) => {
      const imageUrl = getImageUrl(item.product);

      return {
        storage_ids: [],
        url: imageUrl ? [imageUrl] : [],
        thumbnail_url: null,
        temporary_id: null,
        webp_url: null,
      };
    });

    const hasPlus = Boolean(cart.temporary_plus_subscription);
    const shippingCost = hasPlus ? 0 : 199000;

    const payablePrice = (cart.payable_price || 0) + shippingCost;

    const shippingAddress = {
      id: defaultAddress.id,
      name: defaultAddress.name,
      full_name: defaultAddress.full_name,
      address: defaultAddress.address,
      postal_code: defaultAddress.postal_code,
      telephone: defaultAddress.telephone || "",
      mobile: defaultAddress.mobile,
      city_id: defaultAddress.city_id,
      city_name: defaultAddress.city_name,
      state_id: defaultAddress.state_id,
      state_name: defaultAddress.state_name,
      district_id: defaultAddress.district_id ?? null,
      support_fmcg: false,
      is_default: defaultAddress.is_default,
      latitude: defaultAddress.latitude,
      longitude: defaultAddress.longitude,
      building_number: defaultAddress.building_number,
      unit: defaultAddress.unit,
      drop_off_address_id: defaultAddress.drop_off_address_id ?? null,
      is_usable: defaultAddress.is_usable,
      is_general_location_jet_eligible:
        defaultAddress.is_general_location_jet_eligible,
      is_accurate: defaultAddress.is_accurate,
      type: defaultAddress.type || "address",
    };

    const paymentMethod = {
      id: 1,
      type: "online",
      title_fa: "پرداخت اینترنتی",
      title_en: "InternetCash",
      description: "پرداخت آنلاین با تمامی کارت‌های بانکی",
    };

    const paymentMethods = [
      {
        id: 11,
        type: "wallet",
        title_fa: "کیف پول",
        title_en: "wallet",
        description: null,
        default: false,
        notices: [],
        sources: [],
      },
      {
        id: 1,
        type: "online",
        title_fa: "پرداخت اینترنتی",
        title_en: "InternetCash",
        description: "پرداخت آنلاین با تمامی کارت‌های بانکی",
        default: true,
        notices: [],
        sources: [
          {
            source_id: 304,
            source_title: "پرداخت اینترنتی",
            source_description: "پرداخت آنلاین با تمامی کارت‌های بانکی",
            source_type: null,
            is_active: true,
          },
        ],
      },
    ];

    const shipmentItems = orderItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: item.product,
      variant: item.variant,
      price: item.price,
      returned_quantity: 0,
      cancelled_quantity: 0,
      gift_order_items: [],
      cancel_quantity_options: [],
      cancel_quantity_hint: null,
      is_cancellable: false,
      cancel_hint: null,
      should_display_rate: false,
    }));

    const shipments = [
      {
        id: createNumericId(),
        support_shipment_id: "",
        cost: shippingCost,
        order_items_cost: cart.payable_price || 0,
        is_cash_on_delivery: false,
        is_successful: true,
        order_items: shipmentItems,
        submit_type: {
          id: 10,
          name: "ارسال عادی",
          description: "ارسال عادی",
          icon: "",
          icon_color: "#EF394E",
        },
        cost_type: "flexible_price",
        survey: [],
        is_cancelable: false,
        is_cancellation_visible: false,
        is_item_cancelable: false,
        not_item_cancelable_notice: null,
        cancel_hint: null,
        is_modifiable: false,
        is_separated: false,
        status: [],
        date: "",
        start_date: null,
        end_date: null,
        is_nearby_seller: false,
        is_jet_delivery: false,
        digiplus: {
          is_free_shipping: hasPlus,
        },
        digikala_express: {
          verification_code: "",
          show_report_box: false,
          show_report_message: false,
          is_ship_by_seller_post: false,
        },
        shipment_modification_funnel: null,
        delivery_claim: [],
      },
    ];

    const order = await OrderModel.create({
      userId: user._id,

      cart_id: cart._id,

      order_code: orderCode,

      items: orderItems,
      product_images: productImages,
      shipments,

      payable_price: payablePrice,

      payment_status: "paid",

      payment_method: paymentMethod,
      payment_methods: paymentMethods,

      payments: [],

      late_payment: {
        is_button_active: false,
      },

      order_type: "digikala",
      remaining_amount: 0,

      price_details: {
        total_cost: cart.rrp_price_total || 0,
        shipping_cost: shippingCost,
        discount: cart.total_discount || 0,
        gift_card: 0,
        voucher: 0,
        user_paid: payablePrice,
        user_received: 0,
      },

      cash_back: {
        amount: 0,
        digiplus_amount: 0,
        return_days: 7,
      },

      invoice_url: {
        base: null,
        uri: `/profile/orders/invoice/order/${orderCode}/`,
      },

      shipping_address: shippingAddress,
    });

    await CartModel.updateOne(
      { _id: cart._id },
      {
        $set: {
          "packages.0.cart_items": [],
          items_count: 0,
          payable_price: 0,
          rrp_price: 0,
          rrp_price_total: 0,
          items_discount: 0,
          total_discount: 0,
        },
      },
    );

    return Response.json(
      {
        success: true,
        order: {
          id: order.order_code,
          order_code: order.order_code,
          payable_price: order.payable_price,
          status: order.status,
          status_fa: order.status_fa,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "ثبت سفارش انجام نشد",
      },
      { status: 500 },
    );
  }
}
