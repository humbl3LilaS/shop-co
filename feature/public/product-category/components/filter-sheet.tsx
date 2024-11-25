"use client"
import {FilterFormSchemaType} from "@/validation/schema";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {SlidersHorizontal} from "lucide-react";
import FilterForm from "@/feature/public/product-category/components/filter-form";
import {useFilterSheet} from "@/feature/public/product-category/hooks/use-filter-sheet";

type FilterSheetProps = {
    defaultValues: FilterFormSchemaType;
}
const FilterSheet = ({defaultValues}: FilterSheetProps) => {
    const isOpen = useFilterSheet(state => state.isOpen);
    const toggle = useFilterSheet(state => state.toggle);
    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetTrigger className={"ml-auto lg:hidden"}>
                <button
                    className={"size-8  flex items-center justify-center rounded-full bg-[#f0f0f0]"}>
                    <SlidersHorizontal className={"size-4"}/>
                </button>
            </SheetTrigger>
            <SheetContent>
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