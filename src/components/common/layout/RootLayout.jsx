"use client";

import { useEffect, useRef, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@/lib/utils/loadMessages"; // The helper from Step 3

import allNavData from "../../../data/navData.json";
import Preloader from "@/components/preloader/Preloader";
import CommonAnimation from "../CommonAnimation";
import ScrollSmootherComponents from "../ScrollSmootherComponents";
import CursorAnimation from "../CursorAnimation";
import Switcher from "../Switcher";
import ScrollTop from "../ScrollTop";
import Header1 from "@/components/header/Header1";
import Footer1 from "@/components/footer/Footer1";
import Header2 from "@/components/header/Header2";
import Header3 from "@/components/header/Header3";
import Header4 from "@/components/header/Header4";
import Header5 from "@/components/header/Header5";

const HeaderContent = ({ header, navData }) => {
  if (header == "header1") {
    return <Header1 navData={navData} />;
  } else if (header == "header2") {
    return <Header2 navData={navData} />;
  } else if (header == "header3") {
    return <Header3 />;
  } else if (header == "header4") {
    return <Header4 navData={navData} />;
  } else if (header == "header5") {
    return <Header5 />;
  } else if (header == "none") {
    return null;
  } else {
    return <Header3 />;
  }
};

export default function RootLayout({
  children,
  header = "",
  defaultMode = "",
}) {
  // 1) For color mode (already in your code)
  const [mode, setMode] = useState(defaultMode);

  // 2) For language
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(null);

  const [navData, setNavData] = useState({});
  const cursor1 = useRef();
  const cursor2 = useRef();

  useEffect(() => {
    setNavData(allNavData);
  }, []);

  // 3) Load translation messages whenever locale changes
  useEffect(() => {
    let isMounted = true;
    async function fetchMessages() {
      const loaded = await loadMessages(locale);
      if (isMounted) {
        setMessages(loaded);
      }
    }
    fetchMessages();
    return () => {
      isMounted = false;
    };
  }, [locale]);

  // 4) This effect handles "dark" mode toggling (your existing logic)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (mode === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [mode]);

  // 5) Handle RTL/LTR by setting the <html dir="..."> attribute
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr"
      );
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  // 6) If messages are still loading, you can show a fallback or your Preloader
  if (!messages) {
    return <Preloader />;
  }

  return (
    // 7) Wrap everything inside NextIntlClientProvider
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CommonAnimation>
        <div className="has-smooth" id="has_smooth"></div>
        <ScrollSmootherComponents />
        <div className="cursor" id="team_cursor">
          Drag
        </div>
        <Preloader />
        <CursorAnimation cursor1={cursor1} cursor2={cursor2} />
        {/* Pass setLocale down so the Switcher can switch languages */}
        <Switcher
          setMode={setMode}
          mode={mode}
          cursor1={cursor1}
          cursor2={cursor2}
          locale={locale}
          setLocale={setLocale}
        />
        <ScrollTop />
        <HeaderContent header={header} navData={navData} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <Footer1 />
          </div>
        </div>
      </CommonAnimation>
    </NextIntlClientProvider>
  );
}
