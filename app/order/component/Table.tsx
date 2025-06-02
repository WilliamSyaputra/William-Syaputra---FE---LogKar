/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// components/OrderTable.tsx
"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useEffect, useState } from "react";

import KelolaModal from "./modal/kelolaModal";

import { columnsOrder, OrderData } from "@/types/orders";

interface OrderTableProps {
  ordersMap: Map<string, OrderData>;
  onDelete: (key: string) => void;
  observerRef: React.RefObject<HTMLDivElement>;
  loading: boolean;
  hasMore: boolean;
  searchKeyword: string;
  loadNextPage: any;
}

export default function OrderTable({
  ordersMap,
  onDelete,
  observerRef,
  loading,
  hasMore,
  searchKeyword,
  loadNextPage,
}: OrderTableProps) {
  const filteredOrders = Array.from(ordersMap.entries()).filter(([, order]) =>
    order.goods_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const [isOpenKelola, setIsOpenKelola] = useState(false);
  const [selectedItemKey, setSelectedItemKey] = useState("");

  const onOpenKelola = (key: string) => {
    setSelectedItemKey(key);
    setIsOpenKelola(true);
  };

  useEffect(() => {}, [selectedItemKey]);

  const onCloseKelola = () => {
    setIsOpenKelola(false);
    setSelectedItemKey(""); // Reset item.key saat modal ditutup
  };

  const handleDelete = (key: string) => {
    onDelete(key); // Panggil fungsi penghapusan
    onCloseKelola(); // Tutup modal setelah penghapusan
  };

  return (
    <div>
      <Table>
        <TableHeader columns={columnsOrder}>
          {(column) => (
            <TableColumn key={column.key}>{column.title}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={filteredOrders.map(([key, order]) => ({
            key,
            ...order,
          }))}
        >
          {(item) => (
            <TableRow key={item.key}>
              <TableCell className="px-4 py-2 text-sm">{item.do_no}</TableCell>
              <TableCell className="px-4 py-2 text-sm">{item.do_id}</TableCell>
              <TableCell className="px-4 py-2 text-sm max-w-[100px]">
                <div className="relative group cursor-pointer">
                  <span className="block truncate text-sm text-white-800">
                    {item.goods_name}
                  </span>
                  <div className="absolute hidden group-hover:block bg-white-700 text-white text-xs rounded px-2 py-1 z-10 mt-1">
                    {item.goods_name}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.goods_qty}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.goods_unit}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.goods_qty_ton}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.order_type}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.order_type_name}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.origin_name}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.destination_name}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.destination_address}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">{item.status}</TableCell>
              <TableCell className="px-4 py-2 text-sm">{item.ref_no}</TableCell>
              <TableCell className="px-4 py-2 text-sm">
                {item.updated_at}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm">
                <Button onPress={() => onOpenKelola(item.key)}>Kelola</Button>
                <KelolaModal
                  isOpen={isOpenKelola}
                  itemKey={selectedItemKey} // Gunakan state untuk item.key
                  onClose={onCloseKelola}
                  onDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div ref={observerRef} className="h-10" />
      {loading && (
        <p className="text-center py-4 text-sm text-gray-500">Memuat data...</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center py-4 text-sm text-gray-400">
          Tidak ada data lagi.
        </p>
      )}
      {hasMore && !loading && (
        <div
          className="cursor-pointer text-center py-4 text-sm text-blue-500"
          onClick={loadNextPage} // Panggil loadNextPage saat pengguna ingin memuat lebih banyak data
        >
          Muat lebih banyak
        </div>
      )}
      ;
    </div>
  );
}
