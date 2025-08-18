import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, FileText, Lightbulb, Search, Bot } from "lucide-react";
import AiProjectEstimator from "@/components/ai/ai-project-estimator";
import AiSeoAnalyzer from "@/components/ai/ai-seo-analyzer";
import AiContentHelper from "@/components/ai/ai-content-helper";
import PortfolioRecommender from "@/components/ai/portfolio-recommender";

const features = [
  {
    value: "estimator",
    title: "AI Project Estimator",
    icon: <Cpu className="h-5 w-5" />,
    component: <AiProjectEstimator />,
  },
  {
    value: "seo",
    title: "AI SEO Analyzer",
    icon: <Search className="h-5 w-5" />,
    component: <AiSeoAnalyzer />,
  },
  {
    value: "content",
    title: "AI Content Helper",
    icon: <Lightbulb className="h-5 w-5" />,
    component: <AiContentHelper />,
  },
  {
    value: "portfolio",
    title: "Portfolio Recommender",
    icon: <FileText className="h-5 w-5" />,
    component: <PortfolioRecommender />,
  },
];

export default function AiFeaturesSection() {
  return (
    <section id="ai-features" className="container mx-auto py-16 sm:py-24 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Features
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Leverage our suite of intelligent tools to build and grow your digital
          presence.
        </p>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="estimator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.value}
                value={feature.value}
                className="flex flex-col sm:flex-row h-auto gap-2 p-3 text-center sm:text-left"
              >
                {feature.icon}
                <div className="flex flex-col">
                  <span className="font-semibold">{feature.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {features.map((feature) => (
            <TabsContent key={feature.value} value={feature.value}>
              <Card className="mt-4">
                <CardContent className="p-6">{feature.component}</CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto bg-secondary text-secondary-foreground shadow-lg">
          <CardHeader>
            <div className="flex justify-center items-center mb-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Bot className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle>AI Live Chat Assistant</CardTitle>
            <CardDescription className="text-secondary-foreground/80">
              A Feature We Can Build For You
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              We can build you an AI Live Chat Assistant, trained on your
              business data, to provide instant answers to your customers, 24/7.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
