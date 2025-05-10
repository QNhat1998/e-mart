import Container from "@/components/layouts/container";
import Banner from "@/components/banner";
import ProductGrid from "@/components/product-grid";

export default function Home() {
  return (
    <Container className="py-10">
      <Banner />
      <ProductGrid />
    </Container>
  );
}
