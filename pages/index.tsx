import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import Layout from "../components/Layouts";

const Home: NextPage = () => {
  return (
    <Layout layout="default" title="characters">
      <main className="container mx-auto">
        <Link href="/redux">
          <a>
            <h1 className="text-3xl text-center font-bold underline mt-10">
              Using Redux Wrapper
            </h1>
          </a>
        </Link>

        <Link href="/query">
          <a>
            <h1 className="text-3xl text-center font-bold underline mt-10">
              Using React Query
            </h1>
          </a>
        </Link>
      </main>
    </Layout>
  );
};

export default Home;
