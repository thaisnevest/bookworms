import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  useSidebar
} from 'components/ui/sidebar';
import { WormBig } from 'assets';
import Image from 'next/image';
import {
  CircleUserRound,
  BookOpen,
  CirclePlus,
  Users,
  LogOut,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Meu Perfil',
    url: '/Profile',
    icon: CircleUserRound
  },
  {
    title: 'Meu Grupo',
    url: '/Group',
    icon: BookOpen
  },
  {
    title: 'Criar um grupo',
    url: '/',
    icon: CirclePlus
  },
  {
    title: 'Participar de um grupo',
    url: '/',
    icon: Users
  }
];

export default function SidebarLayout() {
  const pathname = usePathname();
  const { state, toggleSidebar, open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="bg-borrowDark p-4">
      <SidebarHeader className="flex items-center justify-center p-6 group-data-[collapsible=icon]:p-2">
        <Image src={WormBig} alt="WormBig" width={150} />
        <button
          onClick={toggleSidebar}
          className="hover:bg-[#3F3232] p-3 rounded-2xl group-data-[collapsible=icon]:rounded-xl"
        >
          {state === 'expanded' ? (
            <ChevronsLeft
              style={{ width: 30, height: 30 }}
              strokeWidth={1}
              className="flex shrink-0"
            />
          ) : (
            <ChevronsRight
              style={{ width: 30, height: 30 }}
              strokeWidth={1}
              className="flex shrink-0"
            />
          )}
        </button>
      </SidebarHeader>
      <SidebarContent className="flex max-h-fit">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="flex justify-center w-full"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="flex items-center w-full h-fit hover:bg-[#3F3232] p-3 rounded-2xl group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl"
                  >
                    <a
                      href={item.url}
                      className="flex group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-10"
                    >
                      <item.icon
                        style={{ width: 30, height: 30 }}
                        strokeWidth={1}
                        className="flex shrink-0"
                      />
                      {state === 'expanded' && (
                        <p className="text-base font-nunito">{item.title}</p>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="border-t-[0.5px] border-[#c2c2c2] opacity-80 w-full rounded"></div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex justify-center w-full">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/Logout'}
                  className="flex items-center w-full h-fit hover:bg-[#3F3232] p-3 rounded-2xl group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl"
                >
                  <a
                    href="/Logout"
                    className="flex group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-10"
                  >
                    <LogOut
                      style={{ width: 30, height: 30 }}
                      strokeWidth={1}
                      className="flex shrink-0"
                    />
                    {open && <p className="text-base font-nunito">Sair</p>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
