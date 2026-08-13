export function useGetProductList(promotionId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!promotionId) return;

    setLoading(true);

    fetch(`/api/promotions/${promotionId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [promotionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}

export { useGetProductList };
