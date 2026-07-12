"use client";

import { Problem } from "@/types";
import { useState, memo } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function AssistantPanel({
  problem,
  code,
  language,
}: {
  problem: Problem;
  code: string;
  language: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    // Add user message and an empty assistant message
    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: "",
      },
    ]);

    setInput("");
    setIsLoading(true);

    console.log("language:", language);

    const body = {
      messages: updatedMessages,
      problem,
      code,
      language,
    };

    console.log(body);
    console.log(JSON.stringify(body));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ASSISTANT_API_URL}/assistant/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages,
            problem,
            code,
            language,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        throw new Error("Request failed");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();


      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });
   

        //parse the chunk into readable lines and extract the content after "data"
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const token = line.replace("data: ", "").trim();

          if (token === "[DONE]") {
            setIsLoading(false);
            return;
          }


          setMessages((prev) => {
            const updated = [...prev];

            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              role: "assistant",
              content: updated[updated.length - 1].content + token + " ",
            };

            return updated;
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-[#252526] p-4 text-sm text-neutral-200">
      <p className="mb-4 text-neutral-400">AI Assistant</p>

      <div className="flex-1 overflow-y-auto pb-24">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-700 text-neutral-200"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            disabled={isLoading}
            placeholder="Ask a question..."
            onChange={(e) => setInput(e.target.value)}
            className="
              w-full
              rounded-md
              border
              border-gray-600
              bg-transparent
              px-4
              py-2
              text-white
              placeholder-gray-400
              outline-none
              focus:border-blue-500
              disabled:opacity-50
            "
          />
        </form>
      </div>
    </div>
  );
}

export default memo(AssistantPanel)
