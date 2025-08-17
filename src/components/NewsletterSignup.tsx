"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  className?: string;
  compact?: boolean;
}

export default function NewsletterSignup({
  className = "",
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to subscribe"
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className={`${className} ${
          compact ? "p-4" : "p-6"
        } bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg`}
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div>
            <h3
              className={`${
                compact ? "text-sm" : "text-lg"
              } font-medium text-green-800 dark:text-green-200`}
            >
              Successfully subscribed!
            </h3>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-green-600 dark:text-green-300 mt-1`}
            >
              Thanks for joining the mailing list. I&apos;ll try to make it worth your while.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className} ${
        compact ? "p-4" : "p-6"
      } bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg`}
    >
      <div className="text-center mb-4">
        <h3
          className={`${
            compact ? "text-lg" : "text-xl"
          } font-medium text-gray-900 dark:text-gray-100 mb-2`}
        >
          Mailing List
        </h3>
        <p
          className={`${
            compact ? "text-sm" : "text-base"
          } text-gray-600 dark:text-gray-300`}
        >
          Get notified when I publish new things.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className={`${
              compact ? "px-3 py-2 text-sm" : "px-4 py-3"
            } flex-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`${
              compact ? "px-4 py-2 text-sm" : "px-6 py-3"
            } bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {status === "error" && errorMessage && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className={`${compact ? "text-xs" : "text-sm"}`}>
              {errorMessage}
            </span>
          </div>
        )}
      </form>

      <p
        className={`${
          compact ? "text-xs" : "text-sm"
        } text-gray-500 dark:text-gray-400 mt-3 text-center`}
      >
        To unsubscribe, email me at mattyang98@gmail.com.
      </p>
    </div>
  );
}
