import { Dispatch, SetStateAction } from "react";

const TabsComponent: React.FC<{
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<"posts" | "drafts">>;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex md:space-x-11 space-x-5 mb-[46px]">
      <button
        className={`text-[22px] font-semibold uppercase cursor-pointer ${
          activeTab === "posts" ? "text-[#1D1D1B] " : "text-[#ACACAC]"
        } pb-2`}
        onClick={() => setActiveTab("posts")}
      >
        Blog Posts
      </button>
      <button
        className={`text-[22px] font-semibold uppercase cursor-pointer ${
          activeTab === "drafts" ? "text-[#1D1D1B] " : "text-[#ACACAC]"
        } pb-2`}
        onClick={() => setActiveTab("drafts")}
      >
        Drafts
      </button>
    </div>
  );
};

export default TabsComponent;
