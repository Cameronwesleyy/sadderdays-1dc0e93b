import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/context/CartContext";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";
import merch05 from "@/assets/merch-05.jpg";
import merch06 from "@/assets/merch-06.jpg";

const products = [
  { id: "lw-01", name: "LOUNGEWEAR PACK 23'", price: 28, image: merch01 },
  { id: "lw-02", name: "LOUNGEWEAR PACK 23'", price: 28, image: merch02 },
  { id: "lw-03", name: "LOUNGEWEAR PACK 23'", price: 28, image: merch03 },
  { id: "lw-04", name: "LOUNGEWEAR PACK 23'", price: 28, image: merch04 },
  { id: "lw-05", name: "LOUNGEWEAR PACK 23'", price: 28, image: merch05 },
  { id: "lw-06", name: "LOUNGEWEAR PACK 23'", price: 28, image: merch06 },
];

const Merch = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Product Grid - Clean, no headers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handleAddToCart(product)}
              >
                <div className="aspect-square bg-background overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="py-4 text-center">
                  <p className="text-xs tracking-widest-custom mb-1">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${product.price}.00
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Merch;
