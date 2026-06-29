import { AppSidebar } from "@/components/layout/app-sidebar";
import { Container } from "@/components/ui/container";
import { PageTransition } from "@/components/layout/page-transition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="flex flex-col gap-6 py-6 lg:flex-row lg:gap-10">
      <AppSidebar orientation="horizontal" className="lg:hidden -mx-1 border-b border-hairline pb-3" />
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-20">
          <AppSidebar />
        </div>
      </aside>
      <div className="min-w-0 flex-1 pb-16">
        <PageTransition>{children}</PageTransition>
      </div>
    </Container>
  );
}
