"use client";

import { useEffect } from "react";

const EventsScrollReset = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
};

export default EventsScrollReset;
