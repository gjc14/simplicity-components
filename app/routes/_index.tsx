import type { MetaFunction } from "@remix-run/node";
import { SimpleNumberInput } from "~/components/NumberInput";

export const meta: MetaFunction = () => {
  return [
    { title: "Simple Number Input" },
    { name: "description", content: "Welcome to Simple Number Input!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-300">
      <SimpleNumberInput />
    </div>
  );
}
