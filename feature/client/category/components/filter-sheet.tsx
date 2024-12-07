"use client"
import {FilterFormSchemaType} from "@/validation/schema";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {SlidersHorizontal} from "lucide-react";
import FilterForm from "@/feature/client/category/components/filter-form";
import {useFilterSheet} from "@/feature/client/category/hooks/use-filter-sheet";
import {useMediaQuery} from "@/hooks/use-media-query";
import {cn} from "@/lib/utils";

type FilterSheetProps = {
    defaultValues: FilterFormSchemaType;
}
const FilterSheet = ({defaultValues}: FilterSheetProps) => {
    const isOpen = useFilterSheet(state => state.isOpen);
    const setOpen = useFilterSheet(state => state.setOpen);

    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger className={"ml-auto lg:hidden"} asChild={true}>
                <button
                    className={"size-8  flex items-center justify-center rounded-full bg-[#f0f0f0]"}>
                    <SlidersHorizontal className={"size-4"}/>
                </button>
            </SheetTrigger>
            <SheetContent side={isMobile ? "bottom" : "right"} className={cn("h-4/5", isMobile && "overflow-y-scroll")}>
                <SheetHeader>
                    <SheetTitle>
                        Filter
                    </SheetTitle>
                </SheetHeader>
                <FilterForm defaultValues={defaultValues}/>
            </SheetContent>
        </Sheet>
    );
};

export default FilterSheet;