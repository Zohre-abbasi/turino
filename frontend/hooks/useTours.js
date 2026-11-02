import { useQuery } from "@tanstack/react-query";
import { getTours } from "../services/tourService";

function useTours(filters = {}) {
  return useQuery({
    queryKey: ["tours", filters],
    queryFn: () => getTours(filters),
  });
}

export default useTours;
