/* eslint-disable no-console */
"use client";

import React, { useEffect, useRef, useState } from "react";

import { orderService } from "@/services/orderSevice";
import { deliveryOrderStatusTabs } from "@/types/constant";
import { OrderData, SummaryDO } from "@/types/orders";
import { OrderPayload } from "@/types/payload";

const PAGE_SIZE = 10;

export default function useOrder() {
  const [ordersMap, setOrdersMap] = useState<Map<string, OrderData>>(new Map());
  const [page, setPage] = useState(1);
  const [tabSummary, setTabSummary] = useState<SummaryDO[]>();
  const [statusFiter, setStatusFiter] = useState<number[]>([0]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [selectedOrigins, setSelectedOrigins] = React.useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = React.useState<
    string[]
  >([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchKeyword]);

  const fetchOrders = async (resetPage = false) => {
    if (resetPage) {
      setPage(1);
      setOrdersMap(new Map());
      setHasMore(true);
    }

    setLoading(true);
    try {
      const payload: OrderPayload = {
        keyword: debouncedKeyword,
        filter: {
          order_status: statusFiter,
          origin_code: selectedOrigins,
          destination_code: selectedDestinations,
        },
        page,
      };

      const res = await orderService.fetchOrderData(payload);
      const newOrders = res.order_list;

      setOrdersMap((prevMap) => {
        const updatedMap = new Map(prevMap);

        newOrders.forEach((order) => {
          const uniqueKey = `${order.do_id}-${order.do_no}-${order.status}`;

          updatedMap.set(uniqueKey, order);
        });

        return updatedMap;
      });

      // Perbarui hasMore berdasarkan jumlah data yang diterima
      if (newOrders.length < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  useEffect(() => {
    fetchOrders(true);
  }, [debouncedKeyword]);

  const loadNextPage = async () => {
    if (!hasMore || loading) return;

    setPage((prevPage) => prevPage + 1);
    await fetchOrders();
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    const currentRef = observerRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, hasMore]);

  const handleDelete = (key: string) => {
    setOrdersMap((prev) => {
      const newMap = new Map(prev);

      newMap.delete(key);

      return newMap;
    });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    setSearchKeyword(keyword);
  };

  const onSearchClear = () => {
    setSearchKeyword("");
  };

  const mapSummaryDO = (
    summaryDO: { status: number; total: number }[]
  ): SummaryDO[] => {
    return summaryDO.map((item) => {
      const statusTab = deliveryOrderStatusTabs.find(
        (tab) => tab.id === item.status
      );

      return {
        status: item.status,
        status_name: statusTab ? statusTab.label : "Unknown Status",
        total: item.total,
      };
    });
  };

  const fetchTabSummary = async () => {
    setLoading(true);
    try {
      const payload: OrderPayload = {
        keyword: debouncedKeyword,
        filter: {
          order_status: statusFiter,
          origin_code: [],
          destination_code: [],
        },
        page,
      };

      const res = await orderService.fetchOrderData(payload);
      const tabSummary = mapSummaryDO(res.summary_do);

      setTabSummary(tabSummary);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabSummary();
  }, []);

  const [currentActiveTab, setCurrentActiveTab] = useState<number>(
    deliveryOrderStatusTabs[0].id
  );

  const handleTabSelectionChange = (tabId: number) => {
    setCurrentActiveTab(tabId);

    console.log("Tab aktif sekarang:", tabId);

    setStatusFiter([tabId]);
  };

  useEffect(() => {
    fetchOrders(true);
  }, [statusFiter]);

  const handleResetPopupFilters = () => {
    setSelectedOrigins([]);
    setSelectedDestinations([]);
  };

  useEffect(() => {
    console.log("selectedDestinations", selectedDestinations);
    console.log("selectedOrigins", selectedOrigins);

    fetchOrders(true);
  }, [selectedDestinations, selectedOrigins]);

  return {
    handleDelete,
    ordersMap,
    observerRef,
    loading,
    hasMore,
    setStatusFiter,
    onSearchChange,
    searchKeyword,
    loadNextPage,
    onSearchClear,
    currentActiveTab,
    handleTabSelectionChange,
    tabSummary,
    setSelectedOrigins,
    setSelectedDestinations,
    selectedDestinations,
    selectedOrigins,
    handleResetPopupFilters,
  };
}
