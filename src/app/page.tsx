"use client";

import Image from "next/image";
import useSWR from 'swr';
import DraggableNote from "./components/DraggableNote";
import { ProfileType } from "./type/profile";

// SWR fetcher函数
const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('SWR获取到的用户资料数据:', data);
  return data.data;
};

export default function Home() {
  // 使用SWR获取数据
  const { data, error, isLoading } = useSWR<ProfileType>(
    'https://fc-mp-b1a9bc8c-0aab-44ca-9af2-2bd604163a78.next.bspapp.com/profile/rabithua',
    fetcher,
    {
      revalidateOnFocus: false, // 聚焦时不重新验证
      revalidateOnReconnect: true, // 重新连接时重新验证
      refreshInterval: 0, // 不自动刷新
    }
  );

  // 错误处理
  if (error) {
    console.error('SWR获取数据失败:', error);
  }

  // 加载状态
  if (isLoading) {
    console.log('SWR正在加载数据...');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className=" mx-auto aspect-[210/297] flex flex-col items-center gap-8 bg-white relative"
      >
        <Image
          src="/Menu bar.svg"
          alt="Menu bar"
          width={800}
          height={100}
          className="w-full"
        />

        <div className="flex gap-5 px-6 w-full">
          <Image
            src={data?.avatar || "https://cdn.bonjour.bio/static/image/defaultAvatar.svg"} // 使用SWR获取的头像或占位图
            alt="Placeholder"
            width={200}
            height={200}
            className="w-40 rounded-full border border-black"
          />
          <div className="flex flex-col justify-around">
            <div className="text-5xl font-bold font-fusion-pixel">{data?.name}</div>
            <div className="space-y-1">
              {
                (data?.basicInfo?.current_doing && data?.basicInfo?.role) && (
                  <div className="text-3xl font-medium font-fusion-pixel">{
                    `${data.basicInfo.current_doing}@${data.basicInfo.role}`
                  }</div>)}
              {data?.basicInfo?.region &&
                Object.values(data.basicInfo.region).every(v => v !== undefined && v !== null && v !== "") && (
                  <div className="text-2xl font-medium font-fusion-pixel">
                    {Object.values(data.basicInfo.region)
                      .filter(v => v !== undefined && v !== null && v !== "")
                      .join("，")}
                  </div>
                )}
              {data?.basicInfo?.gender && (
                <div className="text-2xl font-medium font-fusion-pixel">
                  {data.basicInfo.gender}
                </div>
              )}
            </div>
          </div>
          <div className="ml-auto flex flex-col justify-around">
            <div className="flex flex-col items-center">
              <Image
                src="/folder.svg"
                alt="Folder"
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <div className="text-xl font-medium font-finders-keepers">Folder</div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/folder.svg"
                alt="Folder"
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <div className="text-xl font-medium font-finders-keepers">Folder</div>
            </div>
          </div>
        </div>

        <div className="w-full px-6">
          <Image
            src="/aboutmeBar.svg"
            alt="About Me Bar"
            width={800}
            height={100}
            className="w-full"
          />
          <div className="w-full border-4 border-black p-2 ">
            <div className="w-full flex border-2 border-black relative items-stretch">
              {/* 左边内容区 */}
              <div className="flex flex-col duration-300 gap-4 items-center w-8/10 py-9 px-5 my-3 ml-3 border-gray-100 border-y-3">
                <div className="line-clamp-5 text-xl font-fusion-pixel whitespace-pre-line">
                  {
                    data?.description || "This is a placeholder description. Please update your profile with a meaningful description."
                  }
                </div>
                <div className="border-1 border-black bg-[#E6E6E6] py-1 px-2 w-full font-chi-kare-go">
                  Type a message...
                </div>
              </div>

              <div className="w-9 border-2 ml-auto relative flex flex-col justify-between dot-matrix-bg-small">
                <Image
                  src="/arrow.svg"
                  alt="Arrow"
                  width={50}
                  height={50}
                  className="size-9 -translate-y-[2px]"
                />

                <Image
                  src="/Scrollbox.svg"
                  alt="Arrow"
                  width={50}
                  height={50}
                  className="size-9 rotate-x-180"
                />

                <Image
                  src="/arrow.svg"
                  alt="Arrow"
                  width={50}
                  height={50}
                  className="size-9 translate-y-[2px] rotate-x-180"
                />
              </div>
            </div>

          </div>
        </div>

        <Image
          src="/agiFolder.svg"
          alt="AGI Folder"
          width={160}
          height={100}
          className="h-12 absolute bottom-12 left-10"
        />

        <Image
          src="/BonjourFolder.svg"
          alt="Bonjour Folder"
          width={250}
          height={100}
          className="h-12 absolute bottom-36 left-44"
        />

        <Image
          src="/Sticker.svg"
          alt="Sticker"
          width={250}
          height={250}
          className="size-48 z-1 absolute bottom-12 right-12"
        />

        {/* note */}
        <DraggableNote />
      </div>
    </div>
  );
}