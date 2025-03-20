import { useState } from 'react';
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
import { Modal } from 'components';
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
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

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
    url: '/CreateGroup',
    icon: CirclePlus
  },
  {
    title: 'Participar de um grupo',
    icon: Users
  }
];

export default function SidebarLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar, open } = useSidebar();
  const [selected, setSelected] = useState<number | null>(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false);
  const [isEnterGroupVisible, setIsEnterGroupVisible] =
    useState<boolean>(false);

  const handleConfirmLogout = async () => {
    try {
      await signOut();
      router.push('/Login');
    } catch (error) {
      console.error('Failed to logout');
    }
  };

  const handleCloseLogout = () => {
    setIsLogoutVisible(false);
    setSelected(null);
  };

  const handleCloseEnterGroup = () => {
    setIsEnterGroupVisible(false);
    setSelected(null);
  };

  const handleEnterGroup = () => {
    setIsEnterGroupVisible(false);
    setSelected(null);
  };

  return (
    <>
      <Modal
        isOpen={isLogoutVisible}
        onClose={handleCloseLogout}
        onConfirm={handleConfirmLogout}
        title="Tem certeza que deseja sair?"
        confirmText="Sair"
      />
      <Modal
        isOpen={isEnterGroupVisible}
        onClose={handleCloseEnterGroup}
        title="Digite o código do grupo para entrar em um grupo existente!"
        confirmText="Participar"
        showTextBox
        subtitle="Código do grupo"
        onConfirm={handleEnterGroup}
      />
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
                {items.map((item, index) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex justify-center w-full"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url || selected === index}
                      className="flex items-center w-full h-fit hover:bg-[#3F3232] p-3 rounded-2xl group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl"
                    >
                      <a
                        href={item.url}
                        className="flex group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-10"
                        onClick={() => {
                          setSelected(index);
                          if (index === 3) {
                            setIsEnterGroupVisible(true);
                          }
                        }}
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
                    isActive={pathname === '/' || selected === 4}
                    className="flex items-center w-full h-fit hover:bg-[#3F3232] p-3 rounded-2xl group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl"
                  >
                    <a
                      className="flex group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!h-10"
                      onClick={() => {
                        setSelected(4);
                        setIsLogoutVisible(true);
                      }}
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
    </>
  );
}
