"use client";

import { Input } from "@heroui/input";

import TabsFilterComponent from "./component/TabFilter";
import OrderTable from "./component/Table";
import useOrder from "./useOrder";
import PopoverFilter from "./component/PopoverFilter";

export default function UseOrder() {
  const {
    handleDelete,
    ordersMap,
    observerRef,
    loading,
    hasMore,
    searchKeyword,
    onSearchChange,
    loadNextPage,
    onSearchClear,
    currentActiveTab,
    handleTabSelectionChange,
    tabSummary,
    selectedDestinations,
    selectedOrigins,
    setSelectedOrigins,
    setSelectedDestinations,
    handleResetPopupFilters,
  } = useOrder();

  return (
    <div className="w-full flex justify-center">
      <div className="w-[100%]">
        <div className="mb-4">
          <div className="sticky-header">
            <TabsFilterComponent
              activeTab={currentActiveTab}
              tabs={tabSummary || []}
              onTabChange={handleTabSelectionChange}
            />
          </div>
          <div className="flex flex-row items-center space-x-4 mt-2">
            <Input
              isClearable
              className="max-w-xs"
              placeholder="Cari Berdasarkan Nama Barang"
              type="text"
              value={searchKeyword}
              onChange={onSearchChange}
              onClear={() => onSearchClear()}
            />
            <PopoverFilter
              selectedDestinations={selectedDestinations}
              selectedOrigins={selectedOrigins}
              onDestinationChange={(selected) =>
                setSelectedDestinations(selected)
              }
              onOriginChange={(selected) => setSelectedOrigins(selected)}
              onResetFilters={handleResetPopupFilters}
            />
          </div>
        </div>
        <OrderTable
          hasMore={hasMore}
          loadNextPage={loadNextPage}
          loading={loading}
          observerRef={observerRef}
          ordersMap={ordersMap}
          searchKeyword={searchKeyword}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
