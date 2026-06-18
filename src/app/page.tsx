import HeroSection from "@/components/home/HeroSection";
import TrendingTools from "@/components/home/TrendingTools";
import Categories from "@/components/home/Categories";
import ToolQuiz from "@/components/home/ToolQuiz";
import PopularComparisons from "@/components/home/PopularComparisons";
import RecentTools from "@/components/home/RecentTools";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrendingTools />
      <Categories />
      <ToolQuiz />
      <PopularComparisons />
      <RecentTools />
    </>
  );
}
