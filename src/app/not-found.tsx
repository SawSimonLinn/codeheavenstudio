import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center py-24">
          <h1 className="text-8xl font-black tracking-tighter text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
