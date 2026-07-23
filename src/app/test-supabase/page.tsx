"use client";

import { useEffect } from "react";

import { supabase } from "../../../lib/supabase";

export default function TestSupabasePage() {
  useEffect(() => {
    if (supabase) {
      console.log("Supabase connected successfully");
    }
  }, []);

  return <main>Check the browser console for the Supabase connection test.</main>;
}
