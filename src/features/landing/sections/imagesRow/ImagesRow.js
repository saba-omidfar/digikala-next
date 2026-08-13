import Link from "next/link";

import styles from "./imagesRow.module.css";

function ImagesRow({ widget, systemColor }) {
  const imagesLength = widget?.data?.images?.length;

  let imgContainerClassname = styles.img_container;
  let contentClassName = styles.content;
  let linkClassName = styles.item_link;

  switch (widget?.widget_id) {
    case 20215:
      imgContainerClassname = styles.img_container_20215;
      contentClassName = styles.content_20215;
      linkClassName = styles.link_20215;
      break;

    case 8491:
      imgContainerClassname = styles.img_container_8491;
      contentClassName = styles.content_8491;
      linkClassName = styles.link_8491;
      break;

    case 20244:
      imgContainerClassname = styles.img_container_20244;
      contentClassName = styles.content_20244;
      linkClassName = styles.link_20244;
      break;

    case 20016:
      imgContainerClassname = styles.img_container_20016;
      contentClassName = styles.content_20016;
      linkClassName = styles.link_20016;
      break;

    case 7233:
      imgContainerClassname = styles.img_container_7233;
      contentClassName = styles.content_7233;
      linkClassName = styles.link_7233;
      break;

    case 7236:
      imgContainerClassname = styles.img_container_7236;
      contentClassName = styles.content_7236;
      linkClassName = styles.link_7236;
      break;

    case 7237:
      imgContainerClassname = styles.img_container_7237;
      contentClassName = styles.content_7237;
      linkClassName = styles.link_7237;
      break;

    case 7240:
      imgContainerClassname = styles.img_container_7240;
      contentClassName = styles.content_7240;
      linkClassName = styles.link_7240;
      break;

    case 7617:
      imgContainerClassname = styles.img_container_7617;
      contentClassName = styles.content_7617;
      linkClassName = styles.link_7617;
      break;

    case 9578:
      imgContainerClassname = styles.img_container_9578;
      contentClassName = styles.content_9578;
      linkClassName = styles.link_9578;
      break;

    default:
      break;
  }
  return (
    <div className="w-100 d-flex justify-content-center overflow-hidden position-relative">
      <div
        className={styles.content_container}
        style={{ backgroundColor: systemColor ? "" : "#fff" }}
      >
        <section className={styles.container} id={widget?.widget_id}>
          {widget?.data?.title && (
            <span className={styles.title}>{widget?.data?.title}</span>
          )}
          <div className={`${contentClassName} ${styles.content}`}>
            {widget?.data?.images?.map((item, index) => (
              <Link
                key={index}
                className={`${linkClassName} ${styles.item_link}`}
                target="_blank"
                aria-label={item?.title}
                aria-hidden="true"
                href={item?.url?.uri}
              >
                <div
                  aria-hidden="true"
                  aria-label=""
                  className={imgContainerClassname}
                >
                  <picture>
                    <source type="image/webp" srcSet={item?.image?.webp_url} />
                    <source type="image/jpeg" srcSet={item?.image?.webp_url} />
                    <img
                      className={styles.item_img}
                      src={item?.image?.url}
                      alt=""
                      title=""
                    />
                  </picture>
                </div>
                <span className={styles.item_text}>{item?.title}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ImagesRow;
