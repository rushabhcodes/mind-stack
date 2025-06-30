import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Card } from "./components/ui/Card";

function App() {
  return (
    <>
      <Button
        varient="primary"
        size="md"
        text="Share"
        startIcon={<ShareIcon size="md" />}
      />
      <Button
        varient="secondary"
        size="md"
        text="Add Content"
        startIcon={<PlusIcon size="md" />}
      />
      <Button varient="destructive" size="md" text="Delete" />

      <Card
        title="News"
        type="youtube"
        link="https://www.youtube.com/embed/EQaqgfDT-78?si=zUJ4ROHO5Y28aEgB"
      />
      <Card
        title="My old tweet"
        type="twitter"
        link="https://x.com/rushabhstwt/status/1698522302890057737"
      />
    </>
  );
}

export default App;
