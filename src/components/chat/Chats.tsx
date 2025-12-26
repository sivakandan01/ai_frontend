import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Bot, User } from "lucide-react";

interface ChatsProps {
  message: string;
  side: "left" | "right";
  isLoading: boolean;
}

const CustomPre = ({ children }: React.HTMLAttributes<HTMLPreElement>) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector('code');
      if (codeElement) {
        codeElement.style.color = '#ffffff';
      }

      const spans = preRef.current.querySelectorAll('span');
      spans.forEach(span => {
        span.style.setProperty('color', '#ffffff', 'important');

        const classes = span.className;

        if (classes === 'hljs-keyword') {
          span.style.setProperty('color', '#60a5fa', 'important');
        }
        else if (classes === 'hljs-built_in' || classes === 'hljs-built-in') {
          span.style.setProperty('color', '#facc15', 'important');
        }
        else if (classes === 'hljs-number') {
          span.style.setProperty('color', '#ec4899', 'important'); 
        }
        else if (classes === 'hljs-comment' || classes === 'hljs-quote') {
          span.style.setProperty('color', '#6b7280', 'important'); 
        }
        else if (classes === 'hljs-string') {
          span.style.setProperty('color', '#ffffff', 'important'); 
        }
      });
    }
  }, [children]);

  return (
    <pre
      ref={preRef}
      className="bg-black p-4 rounded-lg overflow-x-auto mb-3"
      style={{ color: '#ffffff' }}
    >
      {children}
    </pre>
  );
};

const Chats = ({ message, side, isLoading }: ChatsProps) => {
  const isAI = side === "left";

  return (
    <div className="flex w-full py-4 px-4">
      <div className={`w-full flex ${isAI ? "justify-start" : "justify-end"}`}>
        <div className={`flex items-start gap-4 max-w-[70%] ${isAI ? "" : "flex-row-reverse"}`}>
          {/* Avatar */}
          <div
            className={`min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full text-[rgb(var(--primary-text))] ${
              isAI
                ? "bg-[rgb(var(--button-primary))]"
                : "bg-blue-600"
            }`}
          >
            {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
          </div>

          {/* Message Content */}
          <div className="flex-1 pt-1">
            {isLoading ? (
              <div className="flex gap-1.5 py-1">
                <div className="w-2 h-2 rounded-full bg-[rgb(var(--secondary-text))] animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-[rgb(var(--secondary-text))] animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-[rgb(var(--secondary-text))] animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
            ) : (
              <div className="text-[rgb(var(--primary-text))] text-[15px] leading-relaxed break-words max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 last:mb-0 text-[rgb(var(--primary-text))]">{children}</p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-4 mt-6 text-[rgb(var(--primary-text))]">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mb-3 mt-5 text-[rgb(var(--secondary-text))]">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-bold mb-3 mt-4 text-[rgb(var(--button-primary))]">{children}</h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-base font-bold mb-2 mt-3 text-[rgb(var(--button-primary))]">{children}</h4>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc ml-6 mb-3 space-y-1.5 text-[rgb(var(--primary-text))]">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal ml-6 mb-3 space-y-1.5 text-[rgb(var(--primary-text))]">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-[rgb(var(--primary-text))]">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-[rgb(var(--primary-text))]">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-[rgb(var(--primary-text))]">{children}</em>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[rgb(var(--border-color))] pl-4 my-3 italic text-[rgb(var(--secondary-text))]">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} className="text-[rgb(var(--button-primary))] hover:opacity-80 underline" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                    code: ({ className, children, ...props }) => {
                      const isCodeBlock = className?.startsWith('language-');

                      return isCodeBlock ? (
                        <code className={className} style={{ background: 'transparent', color: 'inherit' }} {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="bg-black px-1.5 py-0.5 rounded text-sm text-[rgb(var(--primary-text))] font-mono">
                          {children}
                        </code>
                      );
                    },
                    pre: CustomPre,
                  }}
                >
                  {message}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
