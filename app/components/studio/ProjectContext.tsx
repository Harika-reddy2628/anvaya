"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ServiceId } from "../../lib/studio";

const ProjectContext = createContext<{
  selected: ServiceId;
  select: (value: ServiceId) => void;
} | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selected, select] = useState<ServiceId>("product");
  return (
    <ProjectContext.Provider value={{ selected, select }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("Project components require ProjectProvider");
  return context;
}
