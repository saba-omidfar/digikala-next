import { useQuery } from "react-query";
import { getColorPalettes } from "@/services/axios/Requests/colorRequests";

export function useGetColorPalettes() {
  return useQuery(["ColorPallete"], () => getColorPalettes());
}
