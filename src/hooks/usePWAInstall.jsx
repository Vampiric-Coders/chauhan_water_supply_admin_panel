import { useEffect, useState } from "react";

const usePWAInstall = () => {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Chrome default mini-infobar disable
      setPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!prompt) return;

    prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
  };

  return {
    installApp,
    canInstall: Boolean(prompt),
  };
};

export default usePWAInstall;
