import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    id: { type: Number, default: null },

    product: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    variant: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    has_insurance: {
      type: Boolean,
      default: false,
    },

    returned_quantity: {
      type: Number,
      default: 0,
    },

    cancelled_quantity: {
      type: Number,
      default: 0,
    },

    gift_order_items: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  { _id: false },
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      default: null,
    },

    order_code: {
      type: String,
      required: true,
      unique: true,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },

    items: {
      type: [OrderItemSchema],
      default: [],
    },

    payable_price: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["in_progress", "sent", "returned", "cancelled", "canceled_system"],
      default: "in_progress",
    },

    status_fa: {
      type: String,
      enum: [
        "در حال پردازش",
        "تحویل شده",
        "مرجوع شده",
        "لغو شده",
        "لغو سیستمی",
      ],
      default: "در حال پردازش",
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    payment_method: {
      id: {
        type: Number,
        default: 1,
      },

      type: {
        type: String,
        default: "online",
      },

      title_fa: {
        type: String,
        default: "پرداخت اینترنتی",
      },

      title_en: {
        type: String,
        default: "InternetCash",
      },

      description: {
        type: String,
        default: "پرداخت آنلاین با تمامی کارت‌های بانکی",
      },
    },

    order_type: {
      type: String,
      default: "digikala",
    },

    remaining_amount: {
      type: Number,
      default: 0,
    },

    price_details: {
      total_cost: {
        type: Number,
        default: 0,
      },

      shipping_cost: {
        type: Number,
        default: 0,
      },

      discount: {
        type: Number,
        default: 0,
      },

      gift_card: {
        type: Number,
        default: 0,
      },

      voucher: {
        type: Number,
        default: 0,
      },

      user_paid: {
        type: Number,
        default: 0,
      },

      user_received: {
        type: Number,
        default: 0,
      },
    },

    cash_back: {
      amount: {
        type: Number,
        default: 0,
      },

      digiplus_amount: {
        type: Number,
        default: 0,
      },

      return_days: {
        type: Number,
        default: 7,
      },
    },

    invoice_url: {
      base: {
        type: String,
        default: null,
      },
      uri: {
        type: String,
        default: "",
      },
    },

    shipping_address: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    product_images: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    shipments: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    payment_methods: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    payments: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    late_payment: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({ is_button_active: false }),
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
