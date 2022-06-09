import type { NextPage } from "next";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layouts";
import { http } from "../utils/http.js";
import { getCharacters } from "../store/actions/characters";
import { wrapper } from "../store/store";
import { useEffect, useState } from "react";
import useHttpShallow from "../hooks/useHttpShallow";

const Home: NextPage = () => {
  // *********************
  // import hooks
  // *********************
  const dispatch = useDispatch();
  const http: any = useHttpShallow();

  // *********************
  // define states
  // *********************
  const [page, setPage] = useState(1);

  // *********************
  // define useSelector
  // *********************
  const character = useSelector((state: any) => state.character);

  // *********************
  // define useEffects
  // *********************
  useEffect(() => {
    if (http && dispatch)
      http.getCharacters(({ data }: any) => {
        if (data?.results?.length) {
          dispatch(getCharacters(data?.results) as any);
        }
      }, page);
  }, [page, http, dispatch]);

  // *********************
  // render section
  // *********************
  return (
    <Layout layout="default" title="characters">
      <main className="container mx-auto">
        <h1 className="text-3xl text-center font-bold underline mt-10">
          Rick and Morty Charecters!
        </h1>

        <nav aria-label="Page navigation example" className="text-right">
          <ul className="inline-flex items-center -space-x-px">
            <li className="cursor-pointer">
              <a
                onClick={() => setPage((prev) => (prev <= 1 ? prev : --prev))}
                className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
            <li className="cursor-pointer">
              <a
                onClick={() => setPage((prev) => ++prev)}
                className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>

        <div className="grid grid-cols-3 gap-4 mt-10">
          {character?.character?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <Link href={item.url}>
                    <a>
                      <img
                        className="w-full rounded-t-lg"
                        src={item.image}
                        alt={item.name}
                      />
                    </a>
                  </Link>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minus, amet aspernatur. Recusandae nobis, alias quos
                    </p>

                    <Link href={item.url}>
                      <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg
                          className="ml-2 -mr-1 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store: any) =>
    async ({}) => {
      try {
        await Promise.all([
          await http(undefined, undefined, "application/json").getCharacters(
            ({ data }: any) => {
              if (data?.results?.length) {
                store.dispatch(getCharacters(data?.results));
              }
            }
          ),
        ]);
        return {
          props: {},
          revalidate: 30,
        };
      } catch (e) {
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
      }
    }
);

export default Home;
