import React, { useState, useMemo, useEffect } from "react"; // Import useEffect
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, ShoppingCart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { PRODUCTS, CATEGORIES, CAR_BRANDS } from "../data/mockData";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]); // Initialize as empty array

  // Effect to read brand from URL on initial load or URL change
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      // Decode the URI component and set as selected brand
      setSelectedBrands([decodeURIComponent(brandParam)]);
    } else {
      setSelectedBrands([]); // Clear brands if no parameter
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Re-run effect when searchParams change

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === "all" ||
        product.category === selectedCategory;
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, sortBy]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shop Spare Parts</h1>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="space-y-3 mb-6">
                <Label className="text-sm font-medium">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 mb-6">
                <Label className="text-sm font-medium">Brand</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {CAR_BRANDS.map(
                    (
                      brand // Iterate through all brands
                    ) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)} // Check if brand is selected
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <Label
                          htmlFor={brand}
                          className="text-sm cursor-pointer"
                        >
                          {brand}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Price Range</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-20"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-20"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-feature transition-all duration-300"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </Link>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {product.brand}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Part #: {product.partNumber}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        Ksh.{product.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          4.8
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="w-full"
                      variant={product.inStock ? "default" : "secondary"}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedBrands([]);
                    setPriceRange([0, 500]);
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
