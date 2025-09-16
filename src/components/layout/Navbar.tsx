
import { Logo } from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { authApi, useGetMeQuery, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { Link } from "react-router"


const navigationLinks = [
  { label: "Home", href: "/" },
    
  { label: "About", href: "/about" },
{ label: "Features", href: "/features" },
{ label: "Faq", href: "/faq" },
  { label: "Contact", href: "/contact" }, // <-- always visible
  // Dashboard will be added conditionally
];

function Navbar() {
  const { data } = useGetMeQuery(undefined);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  console.log(data,"from navbar")

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  // Add Dashboard link if user is logged in
  const links = data?.data?.email
    ? [...navigationLinks,{ label: "Ride A Book", href: "/book-a-ride" }, { label: "Dashboard", href: "/dashboard" }]
    : navigationLinks;

  return (
    <header className="px-6 py-4 md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 12L20 12" />
                  <path d="M4 12H20" />
                  <path d="M4 12H20" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {links.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink href={link.href} className="py-1.5">
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {links.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {data?.data?.email ? (
            <>
              <span className="text-sm mr-2">Hi, {data.data.name}</span>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-sm">
                Logout
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link to="/login">Sign In</Link>
            </Button>
          )}

          <Button asChild size="sm" className="text-sm">
            <Link to="/become-a-driver">Become A Driver</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;