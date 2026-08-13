import { useEffect, useState } from "react";

export function useWidgetData(widgets = []) {
  const [widgetData, setWidgetData] = useState([]);

  useEffect(() => {
    if (!widgets.length) return;

    const fetchWidgets = async () => {
      const results = await Promise.all(
        widgets.map(async (widget) => {
          if (!widget.url) return widget;

          const res = await fetch(
            `/api/home/widget-factory/widget/${widget.id}/`,
          );
          const json = await res.json();

          return {
            id: widget.id,
            type: widget.type,
            utm: widget.utm,
            data: json?.data?.data,
          };
        }),
      );

      setWidgetData(results);
    };

    fetchWidgets();
  }, [widgets]);

  return widgetData;
}
