export default function groupByPattern(array, pattern) {
  const result = [];
  let start = 0;

  pattern.forEach((size) => {
    result.push(array.slice(start, start + size));
    start += size;
  });

  return result;
}
