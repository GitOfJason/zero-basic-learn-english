import { Outlet, RouteDefinition, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { exerciseData } from "~/pages/exercise/exercise.data";
export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/home"))
  },
  {
    path: "/exercise/:mode",
    component: lazy(() => import("./pages/exercise")),
    data: exerciseData
  }
];
