"use client"; // If you’re using the App Router and want client-side state changes

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";

const Switcher = ({ setMode, mode, cursor1, cursor2, locale, setLocale }) => {
  const switcherIcon = useRef();
  const switcherItems = useRef();
  const switcherOpen = useRef();
  const switcherClose = useRef();
  const cursorStyle = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      switcherIcon.current.style.zIndex = "1000";
      switcherItems.current.style.zIndex = "1000";
    }
  }, []);

  const openSwitcher = () => {
    switcherOpen.current.style.display = "none";
    switcherClose.current.style.display = "flex";
    switcherIcon.current.style.right = "280px";
    switcherItems.current.style.right = "0";
  };

  const closeSwitcher = () => {
    switcherClose.current.style.display = "none";
    switcherOpen.current.style.display = "flex";
    switcherIcon.current.style.right = "0";
    switcherItems.current.style.right = "-280px";
  };

  const cursor = () => {
    const cursor_val = cursorStyle.current.value;
    if (cursor_val === "1") {
      cursor1.current.style.display = "none";
      cursor2.current.style.display = "none";
    } else {
      cursor1.current.style.display = "";
      cursor2.current.style.display = "";
    }
  };

  // Switch between "dark" and "" for your color mode (light)
  const modeChange = (data) => {
    if (data === "dark") {
      if (setMode) {
        setMode("dark");
      }
    } else {
      if (setMode) {
        setMode("");
      }
    }
  };

  // Switch languages
  const handleLanguageSwitch = (lang) => {
    if (setLocale) {
      setLocale(lang); // "en" or "ar"
    }
  };

  return (
    <>
      <div className="switcher__area">
        <div className="switcher__icon" ref={switcherIcon}>
          <button id="switcher_open" ref={switcherOpen} onClick={openSwitcher}>
            <FontAwesomeIcon icon={faGear} />
          </button>
          <button
            id="switcher_close"
            ref={switcherClose}
            onClick={closeSwitcher}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="switcher__items" ref={switcherItems}>
          {/* Select language */}
          <div className="switcher__item">
            <div className="switch__title-wrap">
              <h2 className="switcher__title">Select language</h2>
            </div>
            <div className="switcher__btn mode-type wc-col-2">
              <button
                onClick={() => handleLanguageSwitch("en")}
                className={locale === "en" ? "active" : ""}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageSwitch("ar")}
                className={locale === "ar" ? "active" : ""}
              >
                Arabic
              </button>
            </div>
          </div>

          {/* Cursor */}
          <div className="switcher__item">
            <div className="switch__title-wrap">
              <h2 className="switcher__title">Cursor</h2>
            </div>
            <div className="switcher__btn">
              <select
                defaultValue={2}
                name="cursor-style"
                id="cursor_style"
                ref={cursorStyle}
                onChange={cursor}
              >
                <option value="1">default</option>
                <option value="2">animated</option>
              </select>
            </div>
          </div>

          {/* Color mode (light/dark) */}
          <div className="switcher__item">
            <div className="switch__title-wrap">
              <h2 className="switcher__title">mode</h2>
            </div>
            <div className="switcher__btn mode-type wc-col-2">
              <button
                onClick={() => modeChange("light")}
                className={mode === "dark" ? "" : "active"}
              >
                light
              </button>
              <button
                onClick={() => modeChange("dark")}
                className={mode === "dark" ? "active" : ""}
              >
                dark
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Switcher;
