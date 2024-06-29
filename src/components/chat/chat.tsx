"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "api/ex4",
        onError: (err) => console.error(err),
    });
    const chatParent = useRef<HTMLUListElement>(null);

    // useEffect() to make sure everything is rendered first then useRef renders
    useEffect(() => {
        const domNode = chatParent.current;
        if (domNode) {
            domNode.scrollHeight;
        }
    });

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                    {m.role === "user" ? "User: " : "AI: "}
                    {m.content}
                </div>
            ))}

            <form
                onSubmit={handleSubmit}
                className="fixed bottom-0 flex w-full gap-3 max-w-md mb-8"
            >
                <input
                    className="w-full p-2 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
                <Button className="p-2">Submit</Button>
            </form>
        </div>
    );
}
