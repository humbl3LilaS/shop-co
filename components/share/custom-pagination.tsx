import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type CustomPaginationProps = {
    totalPages: number;
    currentPage: number;
    hrefBase: string;
}
const CustomPagination = ({totalPages, currentPage, hrefBase}: CustomPaginationProps) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button disabled={currentPage === 1} variant={"link"}>
                        <PaginationPrevious
                            href={`${hrefBase}/?page=${currentPage - 1}`}
                        />
                    </Button>
                </PaginationItem>
                {
                    totalPages <= 4 && new Array(totalPages).fill(0).map((item, idx) =>
                        <PaginationItem
                            key={`page_${idx}`}
                            className={cn("cursor-pointer", currentPage === (idx + 1) && "bg-black text-white rounded-lg")}
                        >
                            <PaginationLink
                                href={`${hrefBase}/?page=${idx + 1}`}>{idx + 1}</PaginationLink>
                        </PaginationItem>
                    )
                }
                {
                    totalPages > 5 &&
                    new Array(3)
                        .fill(0)
                        .map((item, idx) =>
                            <PaginationItem
                                key={`page_${idx}`}
                                className={cn(
                                    "cursor-pointer",
                                    currentPage <= 3 && currentPage === (idx + 1) && "bg-black text-white rounded-lg",
                                    currentPage > 3 && currentPage === (idx + (currentPage - 2)) && "bg-black text-white rounded-lg"
                                )}
                            >
                                <PaginationLink
                                    href={`${hrefBase}/?page=${idx + 1}`}
                                >
                                    {currentPage > 3 ? idx + (currentPage - 2) : idx + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                }
                {
                    totalPages > 5 && <PaginationEllipsis/>
                }
                {
                    totalPages > 5 && <PaginationItem>
                        <PaginationLink
                            className={cn("cursor-pointer", currentPage === totalPages && "bg-black text-white rounded-lg")}
                            href={`${hrefBase}/?page=${totalPages}`}
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                }
                <PaginationItem>
                    <Button disabled={currentPage === totalPages} variant={"link"}>
                        <PaginationNext
                            href={`${hrefBase}/?page=${currentPage + 1}`}
                        />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;