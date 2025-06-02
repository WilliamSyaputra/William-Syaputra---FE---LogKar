import { ChipProps } from "@heroui/react";

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "TEAM", uid: "team" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const deliveryOrderStatusTabs = [
  { id: 0, label: "Semua Do" },
  { id: 1, label: "Sedang Dijadwalkan" },
  { id: 2, label: "Terjadwal" },
  { id: 3, label: "Dalam Pengiriman" },
  { id: 4, label: "Tiba Di Muat" },
];
