import VideoPlayer from "@/components/modules/videoPlayer/VideoPlayer";

import styles from "./questionContent.module.css";

function QuestionContent({ answers }) {
  return (
    <div className={styles.content_container}>
      <div className={styles.content}>
        <div className={styles.content_font_size}>
          {answers?.map((item) => {
            switch (item.template) {
              case "text":
                return (
                  <div
                    key={item.id}
                    className={styles.answer_layout__body}
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                );

              case "image":
                return (
                  <div key={item.id} className={styles.answer_img_container}>
                    <picture>
                      <source
                        srcSet={item.photo.webp_url?.[0]}
                        type="image/webp"
                      />
                      <source srcSet={item.photo.url?.[0]} type="image/jpeg" />
                      <img
                        src={item.photo.url?.[0]}
                        alt=""
                        className={styles.answer_img}
                      />
                    </picture>
                  </div>
                );

              case "quote":
                return (
                  <blockquote key={item.id} className={styles.quote_container}>
                    {item.quote?.text}
                  </blockquote>
                );

              case "video":
                return (
                  <div key={item.id} className={styles.video_player_btn}>
                    <VideoPlayer
                      src={item.video?.url?.[0]}
                      poster={item.image}
                    />
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
export default QuestionContent;
