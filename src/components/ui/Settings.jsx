import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const nameFromStorage =
      localStorage.getItem("app_name") || "";

    const emailFromStorage =
      localStorage.getItem("app_email") || "";

    setName(nameFromStorage);
    setEmail(emailFromStorage);
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
    localStorage.setItem(
      "app_name",
      e.target.value
    );
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    localStorage.setItem(
      "app_email",
      e.target.value
    );
  }

  return (
    <div className="h-full p-10 flex gap-20 items-center bg-background text-foreground">
      {/* Left Side */}
      <div className="flex-1">
        <div className="mb-10">
          <Label
            className="mb-2 text-muted-foreground"
            htmlFor="name"
          >
            Name
          </Label>

          <Input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="bg-background text-foreground border-border"
          />
        </div>

        <div>
          <Label
            className="mb-2 text-muted-foreground"
            htmlFor="email"
          >
            Email
          </Label>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="bg-background text-foreground border-border"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <h1 className="mb-10 text-foreground text-xl">
          Name: {name || "—"}
        </h1>

        <h1 className="mb-10 text-foreground text-xl">
          Email: {email || "—"}
        </h1>
      </div>
    </div>
  );
}