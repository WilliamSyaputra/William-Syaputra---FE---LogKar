import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from "@heroui/react";
import React, { useState } from "react";

import { destinations, origins } from "@/types/places";

interface PopoverFilterProps {
  selectedDestinations: string[];
  selectedOrigins: string[];
  onDestinationChange: (selected: string[]) => void;
  onOriginChange: (selected: string[]) => void;
  onResetFilters: () => void;
}

const PopoverFilter: React.FC<PopoverFilterProps> = ({
  selectedDestinations,
  selectedOrigins,
  onDestinationChange,
  onOriginChange,
  onResetFilters,
}) => {
  const [searchTermOrigin, setSearchTermOrigin] = useState("");
  const [searchTermDestination, setSearchTermDestination] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Temporary state to store selections
  const [tempSelectedOrigins, setTempSelectedOrigins] =
    useState<string[]>(selectedOrigins);
  const [tempSelectedDestinations, setTempSelectedDestinations] =
    useState<string[]>(selectedDestinations);

  // Check if there are changes compared to the original selections
  const isApplyDisabled =
    JSON.stringify(tempSelectedOrigins) === JSON.stringify(selectedOrigins) &&
    JSON.stringify(tempSelectedDestinations) ===
      JSON.stringify(selectedDestinations);

  const handleApplyFilters = () => {
    onOriginChange(tempSelectedOrigins);
    onDestinationChange(tempSelectedDestinations);
    setIsPopoverOpen(false);
  };

  const handleclosePopoverFilter = () => {
    setTempSelectedOrigins(selectedOrigins);
    setTempSelectedDestinations(selectedDestinations);
  };

  const handleResetFilters = () => {
    // Reset parent state
    onResetFilters();
    // Reset temporary state
    setTempSelectedOrigins([]);
    setTempSelectedDestinations([]);
  };

  return (
    <Popover
      showArrow
      isOpen={isPopoverOpen}
      offset={10}
      placement="right-start"
      onClose={handleclosePopoverFilter}
      onOpenChange={setIsPopoverOpen}
    >
      <PopoverTrigger>
        <Button
          variant="solid"
          onPress={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] rounded-xl p-0">
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" className="ml-2 mt-4" isVertical={true}>
            <Tab key="Origin" title="Origin">
              <Card className="p-4 m-2">
                <Input
                  className="mb-4"
                  placeholder="Search..."
                  size="sm"
                  value={searchTermOrigin}
                  onChange={(e) => setSearchTermOrigin(e.target.value)}
                />
                <CheckboxGroup
                  value={tempSelectedOrigins}
                  onChange={(selected) =>
                    setTempSelectedOrigins(selected as string[])
                  }
                >
                  {origins
                    .filter((origin) =>
                      origin.name
                        .toLowerCase()
                        .includes(searchTermOrigin.toLowerCase())
                    )
                    .map((origin) => (
                      <Checkbox key={origin.code} value={origin.code}>
                        {origin.name}
                      </Checkbox>
                    ))}
                </CheckboxGroup>
              </Card>
            </Tab>
            <Tab key="Destination" title="Destination">
              <Card className="p-4 m-2">
                <Input
                  className="mb-4"
                  placeholder="Search..."
                  size="sm"
                  value={searchTermDestination}
                  onChange={(e) => setSearchTermDestination(e.target.value)}
                />
                <CheckboxGroup
                  value={tempSelectedDestinations}
                  onChange={(selected) =>
                    setTempSelectedDestinations(selected as string[])
                  }
                >
                  {destinations
                    .filter((destination) =>
                      destination.name
                        .toLowerCase()
                        .includes(searchTermDestination.toLowerCase())
                    )
                    .map((destination) => (
                      <Checkbox key={destination.code} value={destination.code}>
                        {destination.name}
                      </Checkbox>
                    ))}
                </CheckboxGroup>
              </Card>
            </Tab>
          </Tabs>
          <div className="flex flex-row justify-end space-x-2 p-2">
            <Button onPress={handleResetFilters}>Reset</Button>
            <Button isDisabled={isApplyDisabled} onPress={handleApplyFilters}>
              Terapkan
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverFilter;
