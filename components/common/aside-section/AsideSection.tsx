"use client";

import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
/** UI 컴포넌트 */
import { Button, SearchBar } from "@/components/ui";
import { useEffect, useState } from "react";
import { Task } from "@/types";

function AsideSection() {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);

  /** 우리가 생성한 tasks 테이블 데이터 전체 조회 */
  const getTasks = async () => {
    try {
      const { data, status } = await supabase.from("tasks").select("*");

      if (data !== null && status === 200) setTasks(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "에러가 발생했습니다.",
        description: "예상치 못한 에러가 발생했습니다. 문의해주세요.",
      });
    }
  };

  /** Add New Page 버튼을 클릭하였을 때, TASK 생성 */
  const handleCreateTask = async () => {
    try {
      const { data, status } = await supabase
        .from("tasks")
        .insert([{ title: null, start_date: null, end_date: null, boards: null }])
        .select();

      if (status === 201 && data !== null) {
        toast({
          title: "새로운 TASK가 생성되었습니다.",
          description: "나만의 TODO-BOARD를 생성해보세요!",
        });
        router.push(`/board/${data[0].id}`);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "에러가 발생했습니다.",
        description: "예상치 못한 에러가 발생했습니다. 문의해주세요.",
      });
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <aside className="page__aside">
      {/* 검색창 UI */}
      <SearchBar placeholder="검색어를 입력하세요." />
      {/* Add New Page 버튼 UI */}
      <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]" onClick={handleCreateTask}>
        Add New Page
      </Button>
      {/* TODO 목록 UI 하나 */}
      <div className="flex flex-col mt-4 gap-2">
        <small className="text-sm font-medium leading-none text-[#A6A6A6]">9Diin의 TODO-BOARD</small>
        <ul className="flex flex-col">
          {tasks.length === 0 ? (
            <li className="bg-[#F5F5F5] min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm text-neutral-400">
              <div className="h-[6px] w-[6px] rounded-full bg-neutral-400"></div>
              등록된 TASK가 없습니다.
            </li>
          ) : (
            tasks.map((task: Task) => {
              return (
                <li key={task.id} className={`${task.id === Number(id) && "bg-[#F5F5F5]"} min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer`}>
                  <div className={`${task.id === Number(id) ? "bg-[#00F38D]" : "bg-neutral-400"} h-[6px] w-[6px] rounded-full`}></div>
                  <span className={`${task.id !== Number(id) && `text-neutral-400`}`}>{task.title ? task.title : "등록된 제목이 없습니다."}</span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </aside>
  );
}

export { AsideSection };
