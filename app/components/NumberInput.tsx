import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function SimpleNumberInput({
  value = 1,
  onChange,
}: {
  value?: number;
  onChange?: (value: number) => void;
}) {
  const [qty, setQty] = useState(value);

  // handle qty change
  const updateQty = (quantity: number | string) => {
    let newQuantity =
      typeof quantity === "number" ? qty + quantity : parseInt(quantity, 10);
    if (isNaN(newQuantity)) {
      console.log("Input is not a number");
      setQty(1);
    } else if (newQuantity < 1) {
      console.log("Input is less than 1");
      setQty(1);
    } else {
      setQty(newQuantity);
    }
    // And other validation
  };

  useEffect(() => {
    onChange && onChange(qty);
  }, [qty]);

  return (
    <div className="relative flex items-center w-28 h-8 gap-1">
      <button
        type="button"
        className="absolute h-full top-[50%] translate-y-[-50%] left-0 pl-3 focus:outline-none"
        onClick={() => updateQty(-1)}
      >
        <Minus width={22} height={22} />
      </button>
      <input
        type="text"
        name="quantity"
        value={qty}
        onChange={(e) => updateQty(e.target.value)}
        className="w-full h-full text-center m-1 px-1 rounded-md border focus-visible:ring-2 focus-visible:ring-sky-600 focus:outline-none"
      />
      <button
        type="button"
        className="absolute h-full top-[50%] translate-y-[-50%] right-0 pr-3 focus:outline-none"
        onClick={() => updateQty(1)}
      >
        <Plus width={22} height={22} />
      </button>
    </div>
  );
}
