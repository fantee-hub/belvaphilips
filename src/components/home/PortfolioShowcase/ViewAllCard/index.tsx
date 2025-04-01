import Image from "next/image";
import Link from "next/link";

const ViewAllCard = () => {
  return (
    <div className="aspect-square relative bg-white flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h3 className="text-[40px] font-bold mb-2 tracking-[-3px] leading-[115%]">
          VIEW ALL OF
          <br /> OUR WORK
        </h3>
        <div className="flex justify-center">
          <div className="flex justify-center w-[98px] h-[98px] items-center border border-black">
            <Link href="/portfolio">
              <Image
                src="/assets/images/arrow-right.svg"
                width={76.56}
                height={56.56}
                alt="arrow-right"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewAllCard;
