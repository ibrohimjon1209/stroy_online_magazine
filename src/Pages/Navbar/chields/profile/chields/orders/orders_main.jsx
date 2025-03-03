import React from "react";

const Orders_main = () => {
  return (
    <div className="w-[40%] mx-auto">
      <div className="rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">63224636-sonli buyurtma</div>
          <div className="text-green-500 text-sm">Xaridorga Berilgan</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500 mb-2">Yetkazish sanasi</div>
            <div>Juma 10 yanvar</div>
          </div>
          <div>
            <div className="text-gray-500 mb-2">Rasmiylashtirish sanasi</div>
            <div>Juma 10 yanvar</div>
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <div className="text-gray-500 mb-2">1 dona maxsulot</div>
          </div>
          <div>
            <div className="font-medium">126,650 so'm</div>
          </div>
        </div>

        <div className="mt-4 pb-6 border-b border-gray-200 text-center">
          <button className="text-[#BEA086] text-sm">
            Maxsulotni ko'rsatish
          </button>
        </div>
      </div>

      <div className="rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">63224636-sonli buyurtma</div>
          <div className="text-[#BEA086] text-sm">Jarayonda</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500 mb-2">Yetkazish sanasi</div>
            <div>Juma 10 yanvar</div>
          </div>
          <div>
            <div className="text-gray-500 mb-2">Rasmiylashtirish sanasi</div>
            <div>Juma 10 yanvar</div>
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <div className="text-gray-500 mb-2">1 dona maxsulot</div>
          </div>
          <div>
            <div className="font-medium">126,650 so'm</div>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="bg-orange-100 rounded p-2 mr-3">
            <div className="w-10 h-10 bg-orange-500 rounded"></div>
          </div>
          <div>
            <div className="font-medium">PENOFLEX COMFORT</div>
            <div>125,650 so'm</div>
            <div className="text-xs text-gray-500 mt-1">1,000 so'm/1 dona</div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <button className="text-amber-500 text-sm">
            Maxsulotni bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders_main;
