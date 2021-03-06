import Image from "next/image";
import { Button } from "reactstrap";
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import { useRouter } from "next/router";

const ProductScreen = ({ image, title, description, price }) => {
  const descriptionHtml = MarkdownIt({ html: true })
    .use(markdownItAttrs, { allowedAttributes: ["class"] })
    .render(description);

  const router = useRouter();

  return (
    <div className="flex items-center">
      <div className="w-1/2 mt-16 flex justify-end">
        <Image src={image} height="554" width="630" alt={title} />
      </div>
      <div className="w-1/2 mt-16">
        <p className="text-6xl font-normal w-3/4">{title}</p>
        <p className="text-4xl font-bold my-4">{price}</p>
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }}></div>
        <div className="flex flex-col">
          <Button
            className="my-2 w-1/3 h-12"
            color="primary"
            onClick={() => {
              const priceVal = +price.replace("$", "").replace(",", "");
              localStorage.setItem("bnpl-amount", priceVal);
              localStorage.setItem("payment-type", "bnpl");
              router.push("/payment/card");
            }}
          >
            Buy Now, Pay Later
          </Button>
          <Button
            className="my-2 w-1/3 h-12"
            color="primary"
            onClick={() => {
              const priceVal = +price.replace("$", "").replace(",", "");
              localStorage.setItem("bnpl-amount", priceVal);
              localStorage.setItem("payment-type", "bnpl-emi");
              router.push("/payment/card");
            }}
          >
            Pay with EMI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
