import { CopyButton } from '@/components/common/CopyButton';

interface PromptBlockProps {
  prompt: string;
}

export function PromptBlock({ prompt }: PromptBlockProps) {
  return (
    <div className="relative rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <div className="absolute right-2 top-2">
        <CopyButton text={prompt} size={14} />
      </div>
      <pre className="whitespace-pre-wrap break-words pr-10 font-mono text-sm leading-relaxed text-text-primary dark:text-gray-200">
        {prompt}
      </pre>
    </div>
  );
}
