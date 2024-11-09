import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {

    page: number;
    pages: number;
    onPageChange: (page: number) => void;

}
const PaginationSelector = ({ page, pages, onPageChange }: Props) => {

    const pageNumber = [];

    for (let i = 1; i <= pages; i++) {
        pageNumber.push(i);
    }


    return (
        <>
            <Pagination>
                <PaginationContent>
                    {
                        page !== 1 && (
                            <PaginationItem className="mr-3">
                                <PaginationLink href="#" onClick={() => onPageChange(page - 1)}>
                                    <PaginationPrevious> Previous</PaginationPrevious>
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {
                        pageNumber.map((number, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page === number}>
                                    {number}
                                </PaginationLink>
                            </PaginationItem>

                        ))
                    }

                    {
                        page !== pageNumber.length && (
                            <PaginationItem className="ml-3">
                                <PaginationLink href="#" onClick={() => onPageChange(page + 1)}>
                                    <PaginationNext> Next</PaginationNext>
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default PaginationSelector