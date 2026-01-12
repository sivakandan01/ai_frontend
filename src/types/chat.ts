export interface LocalMessage {
  content: string;
  role: "user" | "assistant";
  completed: boolean;
  error: boolean;
}

export interface CreateChats {
  content: string;
  sender_id: string;
  receiver_id: string;
  is_user: boolean;
}

export interface UpdateChats {
  content?: string;
  status?: string;
  is_read?: boolean;
}

export interface ChatResponse {
  id: string;
  content: string;
  created_at: string;
  status: string;
  is_read: boolean;
  is_user: boolean;
}
