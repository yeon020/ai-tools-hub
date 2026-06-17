import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
        <Zap className="h-8 w-8 text-violet-400" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-3">404</h1>
      <p className="text-zinc-400 text-lg mb-2">페이지를 찾을 수 없습니다</p>
      <p className="text-zinc-600 text-sm mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link href="/">
        <Button variant="gradient">홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
