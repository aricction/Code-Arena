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
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <Header onReset={() => setLayout(defaultModel)} />
      <div className="relative z-0 min-h-0 flex-1 overflow-hidden">
        <PlaygroundLayout problem={problem} layout={layout} setLayout={setLayout} />
      </div>
    </main>
  );
}
