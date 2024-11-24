"use client"
import {
    Breadcrumb, BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {usePathname} from "next/navigation";
import {getValidPathnameArray} from "@/lib/utils";
import {DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";


const CustomBreadcrumb = () => {
    const pathname = usePathname();
    const pathnameArray = getValidPathnameArray(pathname);
    return (
        <Breadcrumb className={"mt-6 mb-4"}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                {
                    pathnameArray.length > 2 && <>
                        <BreadcrumbItem>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                <BreadcrumbEllipsis className="h-4 w-4"/>
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>Documentation</DropdownMenuItem>
                                <DropdownMenuItem>Themes</DropdownMenuItem>
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                            </DropdownMenuContent>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                    </>
                }
                {
                    pathnameArray.length == 2 && <>
                        <BreadcrumbItem className={"capitalize"}>
                            <BreadcrumbLink href={`/${pathnameArray[0]}`}>
                                {pathnameArray[0]}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            {pathnameArray[1]}
                        </BreadcrumbItem>
                    </>
                }
                {
                    pathnameArray.length == 1 && <BreadcrumbItem className={"capitalize"}>{pathnameArray[0]}</BreadcrumbItem>
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;