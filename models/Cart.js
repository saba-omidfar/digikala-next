import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    cart_id: String,

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    product: {
      id: {
        type: Number,
        required: true,
        index: true,
      },
    },

    variant: {
      id: {
        type: Number,
        required: true,
      },
    },

    has_insurance: {
      type: Boolean,
      default: false,
    },

    is_next_cart_button_available: {
      type: Boolean,
      default: true,
    },

    e_gift_card_properties: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    _id: false,
  },
);

const PackageSchema = new mongoose.Schema(
  {
    cart_items: {
      type: [ItemSchema],
      default: [],
    },
  },
  {
    _id: false,
  },
);

const CartSchema = new mongoose.Schema(
  {
    items_count: {
      type: Number,
      default: 0,
    },

    payable_price: {
      type: Number,
      default: 0,
    },

    rrp_price: {
      type: Number,
      default: 0,
    },

    rrp_price_total: {
      type: Number,
      default: 0,
    },

    items_discount: {
      type: Number,
      default: 0,
    },

    total_discount: {
      type: Number,
      default: 0,
    },

    insurance: {
      amount: {
        type: Number,
        default: 0,
      },

      rrp_price: {
        type: Number,
        default: 0,
      },

      discount: {
        type: Number,
        default: 0,
      },
    },

    packages: {
      type: [PackageSchema],
      default: [],
    },

    next_cart: {
      type: [ItemSchema],
      default: [],
    },

    temporary_plus_subscription: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    digiplus: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
