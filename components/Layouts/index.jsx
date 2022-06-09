import React, { useEffect } from "react";
import DefaultLayout from "./DefaultLayout";
import Head from "next/head";

export default function Index({ layout, title, children, ...rest }) {
  switch (layout) {
    default:
      return (
        <>
          <Head>
            <title>
              {process.env.NEXT_PUBLIC_APP_NAME} - {title}
            </title>
            <meta
              name="description"
              content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <DefaultLayout {...rest}>
            <>{children}</>
          </DefaultLayout>
        </>
      );
  }
}
