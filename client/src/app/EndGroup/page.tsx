'use client'
import { Worm } from "assets";
import { Layout } from "components";
import { WinnerCard, GroupCover } from "components";
import Ranking from "components/ranking";

export default function EndGroup() {

  return (
    <Layout>
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col basis-2/3 justify-items-center items-center">
          <div className="w-[600px] h-[200px]">
            <GroupCover
              name="Livrados"
              date=" "
              type="PAGES"
              image="https://res.cloudinary.com/dzi0uoyed/image/upload/v1742004406/dlhyyzviwlgwevwe7ls3.png"
            />
          </div>
          <div className="w-[25px] h-[25px]"></div>
          <WinnerCard
            firstName="Analaura"
            firstImage=""
            secondName="Arthur"
            secondImage=""
            thirdName="Janaina"
            thirdImage=""
          />
        </div>
      </div>
    </Layout>

  );
}