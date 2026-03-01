import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { SignedIn, SignInButton, SignOutButton } from "@clerk/clerk-react";

function App() {
  const [query, setQuery] = useState("");
  const [chatList, setChatList] = useState([]);

  const handleQuerysubmit = async (e) => {
    e.preventDefault();

    try {
      setChatList((prev) => [...prev, { source: "User", text: query }]);

      const apiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a professional Restaurant and CSR chatbot.
                  
Restaurant Menu:
1. Zinger Burger - Rs 450
2. Chicken Biryani - Rs 300
3. Chicken Karahi - Rs 1200
4. BBQ Platter - Rs 1800
5. French Fries - Rs 250
6. Cold Drink - Rs 120
7. Chocolate Cake - Rs 350

Help customers with menu details, prices, reservations, and complaints politely.`,
                },
                {
                  text: query,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );

      const aiRes = apiRes.data.candidates[0].content.parts[0].text;

      setChatList((prev) => [...prev, { source: "ai", text: aiRes }]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <SignInButton />
      <SignOutButton />

      <SignedIn>
        <div className=" form">
          <form onSubmit={handleQuerysubmit}>
            <input
              type="text"
              id="query"
              name="query"
              className="text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-64 px-3 py-2.5 shadow-xs placeholder:text-body mx-auto border"
              placeholder="Enter your query"
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
            >
              Click
            </button>
          </form>
        </div>
      </SignedIn>
      {chatList.map((ms, index) => {
        return (
          <div key={index}>
            <div>source:{ms.source}</div>
            <div>{ms.text}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
