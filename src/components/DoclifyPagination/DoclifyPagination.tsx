import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath?: string; // default: "/blog"
};

export default function DoclifyPagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: Props) {
  if (totalPages <= 1) return null;

  const createHref = (page: number) => `${basePath}/page/${page}`;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createHref(currentPage - 1)} />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page !== 1 &&
            page !== totalPages &&
            Math.abs(page - currentPage) > 2
          ) {
            if (page === 2 || page === totalPages - 1) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createHref(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createHref(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
