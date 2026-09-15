import { useMemo, useState } from "react";

const seedOrders = [
  { id: "DZ-1842", item: "Cotton tees, 3-pack", city: "Lahore", status: "Packed" },
  { id: "DZ-1843", item: "Kitchen kettle", city: "Karachi", status: "New" },
  { id: "DZ-1844", item: "School backpack", city: "Islamabad", status: "Shipped" },
  { id: "DZ-1845", item: "LED desk lamp", city: "Faisalabad", status: "New" },
  { id: "DZ-1846", item: "Cotton tees, 3-pack", city: "Lahore", status: "Packed" },
  { id: "DZ-1847", item: "Sports bottle", city: "Multan", status: "New" },
];

const listings = [
  { name: "Cotton tees, 3-pack", stock: 84, factory: "Lahore-A" },
  { name: "Kitchen kettle", stock: 21, factory: "Gujranwala" },
  { name: "School backpack", stock: 12, factory: "Sialkot" },
  { name: "LED desk lamp", stock: 37, factory: "Karachi" },
];

type Status = "New" | "Packed" | "Shipped";

const nextStatus: Record<Status, Status> = {
  New: "Packed",
  Packed: "Shipped",
  Shipped: "Shipped",
};

export function InventoryLab() {
  const [orders, setOrders] = useState(seedOrders);
  const packed = useMemo(
    () => orders.filter((o) => o.status !== "New").length,
    [orders],
  );

  return (
    <div className="rounded-2xl border border-white/10 p-5">
      <p className="hud-line">Alliance Distributors · Daraz.pk</p>
      <h3 className="mt-1 font-display text-2xl">Online store desk</h3>
      <p className="mt-2 text-sm text-mist">
        Stand-in for the Daraz.pk seller desk I ran at Alliance: listings, incoming orders, and
        getting them packed. Numbers are illustrative, not live store data.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["~300", "orders / month"],
          ["500+", "listings"],
          [`${packed}/${orders.length}`, "moved today"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
            <p className="font-display text-lg text-gold">{n}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-mist">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 overflow-auto">
        <table className="w-full text-left text-xs">
          <thead className="font-mono text-[10px] uppercase tracking-widest text-mist">
            <tr>
              <th className="py-2">Order</th>
              <th>Item</th>
              <th>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-white/10">
                <td className="py-2 font-mono text-gold">{o.id}</td>
                <td>{o.item}</td>
                <td className="text-mist">{o.city}</td>
                <td className="text-right">
                  <button
                    type="button"
                    disabled={o.status === "Shipped"}
                    onClick={() =>
                      setOrders((prev) =>
                        prev.map((row) =>
                          row.id === o.id
                            ? { ...row, status: nextStatus[row.status as Status] }
                            : row,
                        ),
                      )
                    }
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
                      o.status === "Shipped"
                        ? "text-mist"
                        : o.status === "Packed"
                          ? "bg-aqua/20 text-aqua"
                          : "border border-white/20"
                    }`}
                  >
                    {o.status === "New" ? "Pack" : o.status === "Packed" ? "Ship" : "Shipped"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-2">
        {listings.map((l) => (
          <div key={l.name}>
            <div className="mb-1 flex justify-between text-xs">
              <span>{l.name}</span>
              <span className="text-mist">
                {l.stock} in stock · {l.factory}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gold"
                style={{ width: `${Math.min(100, (l.stock / 90) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
