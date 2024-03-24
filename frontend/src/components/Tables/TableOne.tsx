import { BRAND } from "@/types/brand";
import Image from "next/image";

let brandData: BRAND[] = [
  {
    suggestion: "/dfadf",
    tokens_saved: 4,
    carbon_saved: 3.5,
    water_saved: 4
  }
];

brandData= []

const TableOne = () => {

  if(brandData.length === 0){
    return (

 <div className="rounded-sm border border-stroke bg-white  px-5 shadow-default dark:border-strokedark dark:bg-boxdark py-6">
          
    <button className="flex mx-auto bg-slate-700 text-white font-bold py-4 px-4 rounded hover:bg-slate-900">
        <h3 className="font-medium uppercase xsm:text-base">
            Get Suggestions
        </h3>
    </button>
            
</div>
    )
  }





  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Suggestions
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Suggestion
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tokens Saved
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Carbon Saved
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Water Saved
            </h5>
          </div>
         
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-4 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {brand.suggestion}
               
              </div>
            
            </div>
            

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.tokens_saved.toString()}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.carbon_saved.toString()}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.water_saved.toString()}</p>
            </div>

          

          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
