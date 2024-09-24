import type { MetaFunction } from "@remix-run/node";
import { CountrySelector } from "~/components/CountrySelector";
import { SimpleNumberInput } from "~/components/NumberInput";
import { TagsInput } from "~/components/TagsInput";

export const meta: MetaFunction = () => {
  return [
    { title: "Simple Number Input" },
    { name: "description", content: "Welcome to Simple Number Input!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-300 gap-3">
      <div>
        <SimpleNumberInput />
      </div>
      <div className="max-w-64">
        <TagsInput className="border-black" />
      </div>
      <div className="max-w-64">
        <CountrySelector onSelect={(country) => console.log(country)} />
      </div>
    </div>
  );
}
