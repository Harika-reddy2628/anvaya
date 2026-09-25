"use client";

import { AgentDock } from "@/components/ui/agent-dock";

const avatarSrc =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80";

export default function Default() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-8">
      <AgentDock
        agentName="Zara"
        avatarSrc={avatarSrc}
        className="w-full max-w-md"
        idleStatus="Your hyperaide"
        onMessageSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1200));
        }}
        workingStatus="doing stuff..."
      />
    </div>
  );
}
