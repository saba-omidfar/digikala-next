"use client";

import { useGetLanding } from "@/features/landing/hooks/useLandingPage";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import WidgetRenderer from "../WidgetRenderer";

import styles from "./landingContent.module.css";
import useScreenStatus from "@/hooks/useScreenStatus";

export default function LandingContent({ id }) {
  const { isSmallScreen } = useScreenStatus();
  const { data, isLoading } = useGetLanding(id);
  const { data: topMegaMenuBanners } = useGetUniversal();

  const widgets = data?.widgets?.slice()?.sort((a, b) => a.sort - b.sort) || [];

  const systemColor = data?.design_system_color;

  if (isLoading) return null;

  return (
    <div
      className={styles.layout_Desktop__container}
      style={{
        paddingTop: (topMegaMenuBanners?.desktop || topMegaMenuBanners?.mobile)
          ?.length
          ? isSmallScreen
            ? 0
            : 168
          : 108,
      }}
    >
      <div
        className={styles.layout_Desktop}
        style={{
          background: systemColor
            ? systemColor?.["--color-neutral-000"]
            : "#fff",
        }}
      >
        {widgets.map((widget, index) => (
          <WidgetRenderer
            key={index}
            widget={widget}
            widgets={widgets}
            landingId={data?.landing_id}
            systemColor={systemColor}
          />
        ))}
      </div>
    </div>
  );
}
