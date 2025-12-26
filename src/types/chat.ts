export interface LocalMessage {
  content: string;
  role: "user" | "assistant";
  completed: boolean;
  error: boolean;
}
