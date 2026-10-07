import { digikalaFetch } from "./digikala";

export async function hydrateItems(items = []) {
  if (!items?.length) return [];

  const hydrated = await Promise.all(
    items.map(async (item) => {
      try {
        const data = await digikalaFetch({
          path: `/product/v1/products/${item.product.id}/`,
        });

        const product = data?.data?.product;

        if (!product) {
          return null;
        }

        const variant = product.variants?.find(
          (v) => Number(v.id) === Number(item.variant.id),
        );

        if (!variant) {
          return null;
        }

        return {
          ...item,

          unavailable: false,

          product: {
            ...product,
            title_fa: product.title_fa,
            images: product.images,
            url: product.url,
            variants: product.variants,
          },

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
        console.error(error);
        return null;
      }
    }),
  );

  return hydrated.filter(Boolean);
}
