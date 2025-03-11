"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostModel } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeletepost } from "../utils/hooks/post";
import { useRouter } from "next/navigation";

export default function DataTable({ data }: { data: PostModel[] }) {
  const router = useRouter();
  const mutationDelete = useDeletepost();

  const onDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationDelete.mutate(
          { id },
          {
            onSuccess: () => {
              Swal.fire("Deleted!", "Data Berhasil Dihapus!", "success");
              router.refresh();
            },
            onError: (error) => {
              Swal.fire(
                "Error!",
                `Gagal menghapus data: ${
                  error?.message || "Terjadi kesalahan"
                }`,
                "error"
              );
            },
          }
        );
      }
    });
  };

  const columns: ColumnDef<PostModel>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "phone", header: "Phone" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-500 text-white"
            onClick={() => onDelete(row.original.id)}
          >
            Delete
          </Button>
          <Link href={`/post/${row.original.id}/edit`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-yellow-500 text-white"
            >
              Edit
            </Button>
          </Link>
          <Link href={`/post/${row.original.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-500 text-white"
            >
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Pagination logic
  const paginatedRows = table
    .getRowModel()
    .rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <div className="w-full overflow-x-auto">
      <div className="border border-[#3C2A21] w-full overflow-hidden rounded-lg shadow-md">
        <Table className="w-full border-collapse">
          {/* HEADER */}
          <TableHeader className="bg-[#D5CEA3] text-[#3C2A21]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-[#3C2A21]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-center uppercase px-4 py-3 border border-[#3C2A21]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {paginatedRows.length ? (
              paginatedRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`border border-[#3C2A21] transition ${
                    index % 2 === 0 ? "bg-[#FAF3E0]" : "bg-[#FFF]"
                  } hover:bg-[#E5D3B3]`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-2 text-center border border-[#3C2A21]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-[#3C2A21]"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 bg-[#D5CEA3] border-t border-[#3C2A21]">
          <Button
            variant="outline"
            className="text-[#3C2A21] border-[#3C2A21]"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </Button>
          <span className="text-[#3C2A21]">Page {page + 1}</span>
          <Button
            variant="outline"
            className="text-[#3C2A21] border-[#3C2A21]"
            onClick={() =>
              setPage((prev) =>
                (prev + 1) * rowsPerPage < table.getRowModel().rows.length
                  ? prev + 1
                  : prev
              )
            }
            disabled={
              (page + 1) * rowsPerPage >= table.getRowModel().rows.length
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
