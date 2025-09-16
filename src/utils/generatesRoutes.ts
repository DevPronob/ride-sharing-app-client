import type { ISideBarItem } from "@/types";

export const generatesRoutes = (data: ISideBarItem[]) => {
  return data.flatMap((section) =>
    Array.isArray(section.items)
      ? section.items.map((route) => ({
          path: route.url,
          Component: route.Component,
        }))
      : []
  );
}