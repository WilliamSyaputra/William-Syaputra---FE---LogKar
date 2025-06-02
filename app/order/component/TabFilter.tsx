import { Button } from "@heroui/button";

import { SummaryDO } from "@/types/orders";

interface FilterTabsComponentProps {
  tabs: SummaryDO[];
  activeTab: number;
  onTabChange: (tabId: number) => void;
}

const TabsFilterComponent: React.FC<FilterTabsComponentProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4" role="tablist">
      {tabs.map((tab) => (
        <Button
          key={tab.status}
          aria-controls={`tabpanel-${tab.status}`}
          aria-selected={activeTab === tab.status}
          className={`px-4 py-2 border rounded-md text-sm font-medium ${
            activeTab === tab.status
              ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          role="tab"
          type="button"
          onPress={() => onTabChange(tab.status)}
        >
          {tab.status_name} ({tab.total})
        </Button>
      ))}
    </div>
  );
};

export default TabsFilterComponent;
