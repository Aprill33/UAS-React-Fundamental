import { useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { flowers as initialFlowers } from "../../Data/Flowers";

const BungaTerjualAdminPage = () => {
  const [soldList, setSoldList] = useState([]);

  useEffect(() => {
    const fetchSold = () => {
      let orders = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("orders_")) {
          const userOrders = JSON.parse(localStorage.getItem(key));
          orders = [...orders, ...userOrders];
        }
      }

      const soldMap = {};
      orders
        .filter(o => o.status === "Selesai" || o.status === "Diproses" || o.status === "Dikirim")
        .forEach(order => {
          if (Array.isArray(order.items)) {
            order.items.forEach(item => {
              if (!soldMap[item.id]) {
                soldMap[item.id] = { ...item, deskripsi: "Terjual: " + (item.qty || 1) };
              } else {
                const currentSold = parseInt(soldMap[item.id].deskripsi.replace("Terjual: ", ""));
                soldMap[item.id].deskripsi = "Terjual: " + (currentSold + (item.qty || 1));
              }
            });
          }
        });

      const sortedList = Object.values(soldMap).sort((a,b) => {
         const aSold = parseInt(a.deskripsi.replace("Terjual: ", ""));
         const bSold = parseInt(b.deskripsi.replace("Terjual: ", ""));
         return bSold - aSold;
      });

      setSoldList(sortedList);
    };

    fetchSold();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fadeIn">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm transition hover:shadow-md cursor-pointer w-fit mt-2"
      >
        <ArrowLeft size={16} /> Kembali
      </button>

      <div className="flex items-center justify-center gap-4 mb-2 mt-4">
        <div className="flex-1 h-[1.5px] bg-pink-200" />
        <div className="text-center shrink-0 px-2">
          <h2 className="text-3xl font-cursive font-bold text-pink-700 mb-1">
            Bunga Terjual
          </h2>
          <p className="text-xs text-pink-500">Daftar bunga yang berhasil terjual</p>
        </div>
        <div className="flex-1 h-[1.5px] bg-pink-200" />
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-pink-100 shadow-sm">
        <h2 className="text-xl font-bold text-pink-900 flex items-center gap-2 px-2">
          <ShoppingCart size={24} className="text-pink-500" /> Bunga Terjual
        </h2>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-4">
        {soldList.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm font-medium">Belum ada bunga yang terjual.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soldList.map((prod, idx) => (
              <div key={prod.id || idx} className="flex items-center gap-4 p-4 border border-pink-50 rounded-2xl bg-white hover:bg-pink-50/50 hover:shadow-md transition">
                <img src={prod.gambarProduk} alt={prod.namaProduk} className="w-20 h-20 rounded-xl object-cover bg-pink-50 border border-pink-100 shrink-0" />
                <div className="flex-1">
                  <h5 className="font-bold text-pink-900 text-sm line-clamp-1">{prod.namaProduk}</h5>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Rp {prod.harga?.toLocaleString("id-ID") || 0}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      {prod.deskripsi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BungaTerjualAdminPage;
