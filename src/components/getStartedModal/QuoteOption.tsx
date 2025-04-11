import ProductShootSelector from "./ProjectShootSelector";

export default function QuoteOption({
  showError,
  productError,
  shootTypeError,
  setProductError,
  setShootTypeError,
  setSelectedProduct,
  setSelectedShootType,
}: {
  showError: boolean;
  productError: boolean;
  shootTypeError: boolean;
  setProductError: (error: boolean) => void;
  setShootTypeError: (error: boolean) => void;
  setSelectedProduct: (product: string | null) => void;
  setSelectedShootType: (shootType: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-6">
        <ProductShootSelector
          onProductChange={(product) => {
            setSelectedProduct(product);

            if (product) setProductError(false);
          }}
          onShootTypeChange={(shootType) => {
            setSelectedShootType(shootType);

            if (shootType) setShootTypeError(false);
          }}
          productError={productError}
          shootTypeError={shootTypeError}
          showError={showError}
        />
      </div>
    </div>
  );
}
