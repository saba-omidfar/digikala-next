export default function buildCategoryTree({
  categoryTree,
  currentNode,
  options,
}) {
  if (!currentNode) return [];

  const map = new Map();

  categoryTree.forEach((item) => {
    map.set(item.category.id, {
      ...item.category,
      parent_id: item.parent_id,
      children: [],
    });
  });

  options.forEach((option) => {
    const node = [...map.values()].find((x) => x.code === option.code);

    if (!node) return;

    let current = node;

    while (current) {
      const parent = map.get(current.parent_id);

      if (!parent) break;

      if (!parent.children.find((x) => x.id === current.id)) {
        parent.children.push(current);
      }

      current = parent;
    }
  });

  return map.get(currentNode.category.id)?.children ?? [];
}
