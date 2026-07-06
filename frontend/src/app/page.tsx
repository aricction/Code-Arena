'use client'

import PlaygroundLayout from "@/components/layout/PlaygroundLayout";
import { problems } from "@/lib/problems";
import defaultModel from "@/components/layout/defaultLayout";
import { useState } from "react";
import type { IJsonModel } from "flexlayout-react";
import Header from "@/components/header";
export default function Home() {
  const problem = problems[0]; // Use the first problem for now
  const [layout, setLayout] = useState<IJsonModel>(defaultModel);

  return (
    <div className="h-screen w-full bg-zinc-50 font-sans dark:bg-black">
      <Header onReset={() => setLayout(defaultModel)} />
      <PlaygroundLayout problem={problem} layout={layout} setLayout={setLayout} />
    </div>
  );
}
