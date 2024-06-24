const PAGES = [10, 20, 40, 50];

export const pageSelection = PAGES.map((item) => ({
  label: `${item}`,
  value: item,
}));
