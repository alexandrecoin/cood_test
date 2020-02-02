export function filterByName(list, keyword) {
  const search = keyword.trim().toLowerCase();
  if (!search.length) return list;
  return list.filter((item) => item.name.toLowerCase().indexOf(search) > -1);
}

export function filterByType(list, type) {
  if (!Object.entries(type).length > 0) return list;
  return list.filter((element) => element.type === type);
}

export function filterByUserNumber(list, number) {
  if(!number) return list;
  return list.filter((element) => element.users.length >= number);
}