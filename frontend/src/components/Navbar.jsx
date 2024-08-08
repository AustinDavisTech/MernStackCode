import { Link } from "react-router-dom"
import { pageData } from "./pageData"
import { useNavigate } from "react-router-dom"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

export function Navbar() {

    const navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem("User")
        navigate("/")
    }

    return (
        <NavigationMenu className="bg-primary fixed w-screen top-0 left-0 h-20 p-2">
            <NavigationMenuList>
                {pageData.map((page) => {
                    return (
                        <NavigationMenuItem>
                            <Link to={page.path}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {page.name}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
            <NavigationMenuLink className={"ml-2 bg-red-500 " + navigationMenuTriggerStyle()} onClick={handleLogout}>Log Out</NavigationMenuLink>
        </NavigationMenu>
    )
}



