import { digikalaFetch } from "@/lib/digikala";

const hydrateItems = async (items = []) => {
  if (!items.length) return [];

  const hydratedItems = await Promise.all(
    items.map(async (item) => {
      try {
        const data = await digikalaFetch({
          path: `/product/v1/products/${item.product.id}/`,
        });

        const product = data?.data?.product;

        if (!product) return null;

        const variant =
          product.variants?.find(
            (variant) => Number(variant.id) === Number(item.variant.id),
          ) ||
          (Number(product.default_variant?.id) === Number(item.variant.id)
            ? product.default_variant
            : null);

        if (!variant) return null;

        const plainItem = item?.toObject ? item.toObject() : item;

        return {
          ...plainItem,

          product,

          variant,

          price: {
            selling_price: variant.price?.selling_price ?? 0,
            rrp_price: variant.price?.rrp_price ?? 0,
            order_limit: variant.price?.order_limit ?? null,
            discount_percent: variant.price?.discount_percent ?? 0,
            is_incredible: variant.price?.is_incredible ?? false,
            is_promotion: variant.price?.is_promotion ?? false,
            timer: variant.price?.timer ?? null,
          },
        };
      } catch (error) {
        console.error("HYDRATE ITEM ERROR:", error);
        return null;
      }
    }),
  );

  return hydratedItems.filter(Boolean);
};

export default hydrateItems;
