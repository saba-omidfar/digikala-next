import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    is_logged_in: {
      type: Boolean,
      default: false,
    },
    auth: {
      token: { type: String, default: "" },
      tokenCreatedAt: { type: Date },
    },
    digiclub: {
      is_digiclub_activated: { type: Boolean, default: false },
      points: { type: Number, default: 0 },
      reward_url_threshold: { type: Number, default: 0 },
      claimable_points: { type: Number, default: 0 },
    },
    notification: {
      count: {
        type: Number,
        default: 0,
      },

      new_notification_count: {
        type: Number,
        default: 0,
      },
    },
    user: {
      first_name: {
        type: String,
        default: "",
      },
      last_name: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      city_id: {
        type: Number,
        default: 0,
      },
      mobile: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      avatar_url: {
        type: String,
        default: "https://api.digikala.com/static/files/fd4840b2.svg",
      },
      is_legal: { type: Boolean, default: false },
      is_foreigner: {
        type: Boolean,
        default: false,
      },
      has_password: {
        type: Boolean,
        default: false,
      },
      hashed_user_id: {
        type: String,
        default: "",
      },
      uuid: {
        type: String,
        default: "",
      },
      national_identity_number: { type: String, default: "" },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other",
      },
      birthday_iso: {
        type: String,
        default: "",
      },
      city_name: {
        type: String,
        default: "",
      },
      state_name: {
        type: String,
        default: "",
      },
      phone_hash: {
        type: String,
        default: "",
      },
    },
    auth: {
      token: {
        type: String,
        default: "",
      },

      tokenCreatedAt: {
        type: Date,
        default: null,
      },
    },
    default_address: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        default: null,
      },
      name: {
        type: String,
        default: "",
      },
      full_name: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      postal_code: {
        type: String,
        default: "",
      },
      telephone: {
        type: String,
        default: "",
      },
      mobile: {
        type: String,
        default: "",
      },
      city_id: {
        type: Number,
        default: null,
      },
      city_name: {
        type: String,
        default: "",
      },
      state_id: {
        type: Number,
        default: null,
      },
      state_name: {
        type: String,
        default: "",
      },
      is_default: { type: Boolean, default: false },
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
      building_number: { type: String, default: "" },
      unit: { type: String, default: "" },
      drop_off_address_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
      is_usable: { type: Boolean, default: false },
      is_general_location_jet_eligible: { type: Boolean, default: false },
      is_accurate: { type: Boolean, default: false },
      type: { type: String, default: "address" },
    },
    city: {
      id: {
        type: Number,
        default: null,
      },
      state_id: {
        type: Number,
        default: null,
      },
      name: {
        type: String,
        default: "",
      },
    },
    social_profile: {
      is_activated: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        default: "",
      },
      username: {
        type: String,
        default: "",
      },
      user_image: {
        type: String,
        default:
          "https://dkstatics-public.digikala.com/digikala-content-x-profile/730b1da13c1ab319e28246314a4e9ab67267826b_1737805761.png",
      },
    },
    fresh: {
      warehouse_id: { type: Number, default: 0 },
    },
    location_area: { type: String, default: "" },
    cart: {
      items_count: { type: Number, default: 0 },
      payable_price: { type: Number, default: 0 },
      rrp_price: { type: Number, default: 0 },
      rrp_price_total: { type: Number, default: 0 },
      items_discount: { type: Number, default: 0 },
      total_discount: { type: Number, default: 0 },
      insurance: {
        amount: { type: Number, default: 0 },
        rrp_price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
      },
      temporary_plus_subscription: {
        title: { type: String, default: "" },
        rrp_price: { type: Number, default: 0 },
        payable_price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
      },
    },
    favorite_products: {
      type: [String],
      default: [],
    },
    viewed_products: [
      {
        productId: {
          type: Number,
          required: true,
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    search_history: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
