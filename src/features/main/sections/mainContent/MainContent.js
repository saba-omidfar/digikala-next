import WidgetRenderer from "@/features/main/sections/WidgetRenderer";
import LegacyMainContent from "@/features/main/sections/LegacyMainContent";
import CircleLoading from "@/components/modules/circleLoading/CircleLoading";

import styles from "./mainContent.module.css";

export default function MainContent({ categoryCode, data, loading, title }) {
  return (
    <main className={styles.layout_Desktop__container}>
      {loading ? (
        <CircleLoading />
      ) : (
        <div className={styles.layout_Desktop__content}>
          {data?.widgets?.length ? (
            data?.widgets?.map((widget) => (
              <WidgetRenderer
                key={widget.id || widget.widget_type}
                widget={widget}
              />
            ))
          ) : (
            <LegacyMainContent
              data={data}
              title={title}
              categoryCode={categoryCode}
            />
          )}
        </div>
      )}
    </main>
  );
}
