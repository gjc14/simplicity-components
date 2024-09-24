/**
 * @file CountrySelector.tsx
 * @description CountrySelector component. Huge thank to mledoze for the countries data, which follows ISO 3166-1.
 * @link https://github.com/mledoze/countries/blob/master/dist/countries-unescaped.json.
 * @updated 2024-08-21
 */
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import countriesJson from "~/data/location/countries.json";

const CountrySelector = (props: { onSelect?: (country: string) => void }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const countries = countriesJson;
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              {selectedCountry
                ? countries.find(
                    (country) => country.commonNames === selectedCountry
                  )?.flag
                : null}{" "}
              {selectedCountry
                ? countries.find(
                    (country) => country.commonNames === selectedCountry
                  )?.nativeCommonNames[0]
                : "Select country"}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.cca3}
                    value={country.commonNames}
                    onSelect={(currentValue) => {
                      setSelectedCountry(currentValue);
                      props.onSelect && props.onSelect(currentValue);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {country.flag}
                      <p className="text-wrap">
                        {country.nativeCommonNames[0]}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { CountrySelector };
