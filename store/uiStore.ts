import { create } from "zustand";

export type AiResultPayload = {
  title: string;
  kind: "summary" | "draft";
  body: string;
  promptPreview?: string;
};

type UiStore = {
  isAssistantBusy: boolean;
  aiResult: AiResultPayload | null;
  setAssistantBusy: (busy: boolean) => void;
  setAiResult: (result: AiResultPayload | null) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isAssistantBusy: false,
  aiResult: null,
  setAssistantBusy: (busy) => set({ isAssistantBusy: busy }),
  setAiResult: (aiResult) => set({ aiResult }),
}));
