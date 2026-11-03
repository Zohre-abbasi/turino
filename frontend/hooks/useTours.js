import { useQuery } from "@tanstack/react-query";
import { getTours } from "../services/tourService";

function useTours(filters = {}, options = {}) {
  return useQuery({
    queryKey: ["tours", filters],
    queryFn: () => getTours(filters),
    ...options,
  });
}

export default useTours;
