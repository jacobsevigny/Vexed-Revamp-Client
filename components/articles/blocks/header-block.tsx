"use client";

interface Props {
  content: string;
  onChange: (text: string) => void;
}

export function HeaderBlock({ content, onChange }: Props) {
  return (
    <input
      type="text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Section header (e.g. 32. Patrick Mahomes, KC Chiefs)"
      className="w-full bg-transparent text-xl font-bold text-white placeholder:text-white/25 focus:outline-none"
    />
  );
}
