import { QueryClient } from "@tanstack/react-query";

export const mockDataQuery = () => ({
  queryKey: ["mockData"],
  queryFn: async () => {
    const data = await fetch("/mockdata.json");
    const jsonData = await data.json();
    return jsonData;
  },
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = mockDataQuery();

  return (
    queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
  );
};
