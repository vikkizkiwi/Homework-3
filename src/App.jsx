import { useState } from "react";

export default function App() {
   // CART STATE
   const [cart, setCart] = useState([]);

   // MOBILE NAV TOGGLE
   const [menuOpen, setMenuOpen] = useState(false);

   // MENU ITEMS
   const menuItems = [
      { name: "Cheese Burger", price: 8.99 },
      { name: "French Fries", price: 3.99 },
      { name: "Pepperoni Pizza", price: 12.99 },
      { name: "Chicken Wings", price: 9.99 },
      { name: "Veggie Wrap", price: 7.49 },
      { name: "Chicken Nuggets", price: 6.99 },
   ];

   // ADD TO CART
   function addToCart(item) {
      setCart((prev) => {
         const existing = prev.find((i) => i.name === item.name);
         if (existing) {
            return prev.map((i) =>
               i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
            );
         }
         return [...prev, { ...item, quantity: 1 }];
      });
   }

   // REMOVE ITEM
   function removeItem(index) {
      setCart((prev) => prev.filter((_, i) => i !== index));
   }

   // CLEAR CART
   function clearCart() {
      setCart([]);
   }

   // TOTAL
   const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   );

   return (
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
         {/* HEADER */}
         <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <div className="flex items-center gap-2">
               <img
                  src="/images/logo.png"
                  className="w-10 h-10"
                  alt="Burgerz Logo"
               />
               <span className="text-2xl font-bold">Burgerz</span>
            </div>

            {/* NAV */}
            <nav className="hidden md:block">
               <ul className="flex gap-6 text-lg font-medium">
                  <li>
                     <a href="#" className="hover:text-red-500">
                        Home
                     </a>
                  </li>
                  <li>
                     <a href="#" className="text-red-500 font-semibold">
                        Menu
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-red-500">
                        Gallery
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-red-500">
                        About
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-red-500">
                        Contact
                     </a>
                  </li>
               </ul>
            </nav>

            {/* MOBILE MENU */}
            <button
               className="md:hidden text-3xl"
               onClick={() => setMenuOpen(!menuOpen)}
            >
               ☰
            </button>
         </header>

         {/* MOBILE DROPDOWN NAV */}
         {menuOpen && (
            <ul className="md:hidden flex flex-col bg-white shadow-lg p-4 gap-3 text-lg font-medium">
               <li>
                  <a href="#" className="hover:text-red-500">
                     Home
                  </a>
               </li>
               <li>
                  <a href="#" className="text-red-500 font-semibold">
                     Menu
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-red-500">
                     Gallery
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-red-500">
                     About
                  </a>
               </li>
               <li>
                  <a href="#" className="hover:text-red-500">
                     Contact
                  </a>
               </li>
            </ul>
         )}

         {/* MENU SECTION */}
         <section className="flex flex-col lg:flex-row gap-10 p-6 mt-4">
            {/* MENU CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
               {menuItems.map((item) => (
                  <div
                     key={item.name}
                     className="bg-white rounded-xl shadow p-5 flex flex-col items-start"
                  >
                     <h3 className="text-xl font-bold">{item.name}</h3>
                     <p className="text-gray-600 mb-2">Delicious {item.name}</p>
                     <span className="text-lg font-semibold mb-4">
                        ${item.price.toFixed(2)}
                     </span>

                     <button
                        onClick={() => addToCart(item)}
                        className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                     >
                        Add to Cart
                     </button>
                  </div>
               ))}
            </div>

            {/* CART */}
            <section className="w-full lg:w-80 bg-white shadow p-6 rounded-xl h-fit">
               <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

               <div className="flex flex-col gap-3 mb-4">
                  {cart.length === 0 && (
                     <p className="text-gray-500 text-sm">
                        Your cart is empty.
                     </p>
                  )}

                  {cart.map((item, index) => (
                     <div
                        key={index}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded"
                     >
                        <span>
                           {item.name} (${item.price.toFixed(2)}) ×{" "}
                           {item.quantity}
                        </span>

                        <button
                           onClick={() => removeItem(index)}
                           className="text-red-500 hover:text-red-700 font-bold"
                        >
                           Remove
                        </button>
                     </div>
                  ))}
               </div>

               <p className="font-semibold text-lg mb-3">
                  Total: ${total.toFixed(2)}
               </p>

               <button
                  onClick={clearCart}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
               >
                  Clear Cart
               </button>
            </section>
         </section>

         {/* FOOTER */}
         <footer className="mt-auto bg-white text-center py-4 shadow-inner">
            <p className="text-gray-600">© 2025 Burgerz Restaurant</p>
         </footer>
      </div>
   );
}
