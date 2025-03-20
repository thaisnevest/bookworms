import SidebarLayout from 'components/sidebar';
import { SidebarProvider } from 'components/ui/sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <SidebarLayout />
        <main className="flex-col w-full h-full bg-white overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
