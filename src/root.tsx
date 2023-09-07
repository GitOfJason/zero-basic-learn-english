// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useRoutes
} from "solid-start";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import { routes } from "~/routes";
import { AppProvider } from "~/app-context";

export default function Root() {
  const Routes = useRoutes(routes);
  return (
    <Html lang="en">
      <Head>
        <Title>零基础学习英语语法-随册练习</Title>
        <Meta charset="utf-8" />
        <Meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
      </Head>
      <Body class="bg-light text-gray-5 text-sm flex h-screen flex-items-start flex-justify-center">
        <Suspense>
          <ErrorBoundary>
            <AppProvider>
              <Routes />
            </AppProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
