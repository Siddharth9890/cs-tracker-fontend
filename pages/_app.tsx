import { useRouter } from "next/router";
import Footer from "../components/Footer/Footer";
import type { AppProps } from "next/app";
import Header from "../components/Header/Header";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../redux/store";
import PersistLogin from "../components/PersistentLogin/PersistentLogin";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const DisableReactDevTools = dynamic(
  () => import("../components/utils/DisableReactDevTools"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.clear();
  console.info(
    "%cUsing this console may allow attackers to impersonate you and steal your information.Do not enter any code.",
    "color:" + "red" + ";font-weight:bold;"
  );

  if (
    router.pathname === "/register" ||
    router.pathname === "/login" ||
    router.pathname === "/verify"
  ) {
    return (
      <ThemeProvider attribute="class">
        <Provider store={store}>
          <Head>
            <title>Cs tracker</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div className="bg-white dark:bg-black text-black dark:text-white ">
            <Component {...pageProps} />
            <Footer />
          </div>
        </Provider>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider attribute="class">
        <Provider store={store}>
          <DisableReactDevTools />
          <Head>
            <title>Cs tracker</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta
              name="title"
              content="Cs Tracker Master your Data structures and Algorithms Skills"
            />
            <meta
              name="description"
              content="Platform to practice programming problems with revision features and notes to remember the questions"
            />
            <meta
              name="keywords"
              content="data structures and algorithms leetcode learn data structures and algorithms leetcode leetcode data structures and algorithms tutorial data structures and algorithms leetcode answers data structures and algorithms leetcode answers pdf data structures and algorithms leetcode algorithm data structures and algorithms leetcode array data structures and algorithms leetcode all-o'one-data-structure data structures and algorithms leetcode book data structures and algorithms leetcode best practices data structures and algorithms leetcode c++ data structures and algorithms leetcode code data structure and algorithms leetcode design data structure and algorithms leetcode disjoint set data structures and algorithms leetcode example data structures and algorithms leetcode explanation data structures and algorithms leetcode easy data structures and algorithms leetcode expert data structures and 
            algorithms leetcode free data structures and algorithms leetcode for practice data structures and algorithms leetcode for beginners data structures and algorithms leetcode for experienced data structures and algorithms leetcode for dummi data structure and algorithms leetcode find data structures and algorithms leetcode github data structures and algorithms leetcode geeksfor data structure and algorithms leetcode graph data structures and algorithms leetcode hackerrank data structures and algorithms leetcode help data structures and algorithms leetcode hack data structures and algorithms leetcode hex data structures and algorithms leetcode hexadeci data structure and algorithms leetcode heap data structures and algorithms in java leetcode data structures and algorithms leetcode kya hai data structures and algorithms leetcode kotlin data structures and algorithms leetcode keywords data structures and algorithms leetcode knn data structures and algorithms leetcode mcq data structures and algorithms leetcode mcq questions data structures and algorithms leetcode notes data structures and algorithms leetcode notes pdf data structures and algorithms leetcode nptel data structures and algorithms leetcode online data structures and algorithms leetcode optimization data structures and algorithms leetcode org data structures and algorithms leetcode online test data structures and algorithms leetcode output data structure and algorithms leetcode o one data structures and algorithms leetcode pdf data structures and algorithms leetcode problems data structures and algorithms leetcode python data structures and algorithms leetcode practice data structures and algorithms leetcode plan data structures and algorithms leetcode questions data structures and algorithms leetcode quiz data structures and algorithms leetcode questions and answers data structures and algorithms leetcode question bank data structures and algorithms leetcode reasoning data structures and algorithms leetcode recursion data structures and algorithms leetcode reddit data structure and algorithms leetcode rope leetcode comprehensive-data-structure-and-algorithm-study-guide leetcode ds and algo data structures leetcode leetcode data structures problems data structures and algorithms leetcode using for loop data structures and algorithms leetcode university data structures and algorithms leetcode using linked list data structures and algorithms leetcode udemy data structures and algorithms leetcode using java data structure and algorithms leetcode union find data structures and algorithms leetcode viva questions data structures and algorithms leetcode v2 data structures and algorithms leetcode video data structures and algorithms leetcode visualization data structures and algorithms leetcode week 1 data structures and algorithms leetcode week 3 data structures and algorithms leetcode week 2 data structures and algorithms leetcode with answers data structures and algorithms leetcode with solutions data structures and algorithms leetcode xpath data structures and algorithms leetcode xml data structures and algorithms leetcode xp data structures and algorithms leetcode x++ data structures and algorithms leetcode youtube data structures and algorithms leetcode youtube solution data structures and algorithms leetcode year wise data structures and algorithms leetcode year 4 data structures and algorithms leetcode year 1 data structures and algorithms leetcode 00 data structures and algorithms leetcode 06 data structures and algorithms leetcode 05 data structures and algorithms leetcode 01 data structures and algorithms leetcode 18 data structures and algorithms leetcode 17 data structures and algorithms leetcode 16 data structures and algorithms leetcode 15 data structures and algorithms leetcode 20 data structures and algorithms leetcode 22 data structures and algorithms leetcode 21 data structures and algorithms leetcode 25 data structures and algorithms leetcode 30 data structures and algorithms leetcode 32 data structures and algorithms leetcode 34 data structures and algorithms leetcode 31 leetcode data structures and algorithms leetcode data structures data structures and algorithms leetcode 40 data structures and algorithms leetcode 45 data structures and algorithms leetcode 44 data structures and algorithms leetcode 48 data structures and algorithms leetcode 64 data structures and algorithms leetcode 60 data structures and algorithms leetcode 65 data structures and algorithms leetcode 68 data structures and algorithms leetcode 78 data structures and algorithms leetcode 75 data structures and algorithms leetcode 70 data structures and algorithms leetcode 74 data structures and algorithms leetcode 99 data structures and algorithms leetcode 90 data structures and algorithms leetcode 98 data structures and algorithms leetcode 97"
            />
            <meta name="robots" content="index,follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="8 days" />
            <meta name="author" content="siddharth.a9890@gmail.com"></meta>
          </Head>
          <div className="bg-white flex flex-col min-h-screen dark:bg-black text-black dark:text-white ">
            <Header />
            <PersistLogin />
            <Component {...pageProps} />
            <Footer />
          </div>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
