import Breadcrumb from "../breadcrumb/Breadcrumb";
import WidgetRenderer from "@/features/main/sections/WidgetRenderer";
import LegacyMainContent from "@/features/main/sections/LegacyMainContent";
import CircleLoading from "@/components/modules/circleLoading/CircleLoading";

import { useWidgetData } from "../../hooks/useMainCategories";

import styles from "./mainContent.module.css";

export default function MainContent({ categoryCode, data, loading, title }) {
  const widgets = useWidgetData(data?.widgets);

  return (
    <main className={styles.layout_Desktop__container}>
      {loading ? (
        <CircleLoading />
      ) : (
        <>
          <div className="w-100 px-5">
            <Breadcrumb breadcrumb={data?.breadcrumb} isLoading={loading} />
          </div>
          <div className="w-100">
            {widgets?.length ? (
              widgets?.map((widget) => (
                <div className={styles.widget}>
                  <WidgetRenderer
                    key={widget.id || widget.widget_type}
                    widget={widget}
                  />
                </div>
              ))
            ) : (
              <LegacyMainContent
                data={data}
                title={title}
                categoryCode={categoryCode}
              />
            )}
          </div>
        </>
      )}

      {data?.seo ? (
        <article className={styles.seo_container}>
          <div className={styles.article_content}>
            <div
              className={styles.article_content_text}
              dir="rtl"
              dangerouslySetInnerHTML={{
                __html: data?.seo?.content || "",
              }}
            ></div>
          </div>
        </article>
      ) : (
        ""
      )}
    </main>
  );
}
