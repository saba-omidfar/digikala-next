import { useMemo } from "react";

export default function useGalleryGroups(product, comments) {
  const commentFiles = comments?.map((c) => c.files);

  return useMemo(() => {
    if (!product) return [];

    const groups = [];

    const mainImage = product?.images?.main?.url?.[0]
      ? {
          src: {
            url: product.images.main.url?.[0],
            webp_url: product.images.main.webp_url?.[0],
          },
          type: "image",
        }
      : null;

    if (product.images.list.length || product.videos?.length) {
      const firstImage = product.images.list[0]
        ? [
            {
              src: {
                url: product.images.list[0].url[0],
                webp_url: product.images.list[0].webp_url[0],
              },
              type: "image",
            },
          ]
        : [];

      const videos =
        product.videos?.map((video) => ({
          src: video.url,
          image: video.cover,
          type: "video",
          thumbnail: video.cover,
        })) || [];

      const otherImages =
        product.images.list.slice(1).map((img) => ({
          src: {
            url: img.url[0],
            webp_url: img.webp_url[0],
          },
          type: "image",
        })) || [];

      groups.push({
        type: "MAIN",
        items: [mainImage, ...firstImage, ...videos, ...otherImages],
      });
    }

    if (comments?.length) {
      comments.forEach((comment) => {
        if (comment.files?.length) {
          groups.push({
            type: "COMMENTS",
            comment: comment,
            commentId: comment.id,
            items: comment.files.map((file) => ({
              commentId: comment.id,
              src: file.url[0],
              thumbnail: file?.thumbnail_url?.[0],
              type: "image",
            })),
          });
        }
      });
    }

    return groups;
  }, [product?.images?.list, product?.videos, commentFiles]);
}
