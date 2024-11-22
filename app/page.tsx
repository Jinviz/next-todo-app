"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
/** UI 컴포넌트 */
import { Button } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";

function InitPage() {
  const { toast } = useToast();
  const router = useRouter();

  /** Add New Page 버튼을 클릭하였을 때, TASK 생성 */
  const handleCreateTask = async () => {
    console.log("click!");
    try {
      const { data, status } = await supabase
        .from("tasks")
        .insert([{ title: null, start_date: null, end_date: null, boards: null }])
        .select();
      console.log(data, status)
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 mb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">How to start:</h3>
        <div className="flex flex-col items-center gap-3">
          <small className="text-sm font-normal leading-none">1. Create a page</small>
          <small className="text-sm font-normal leading-none">2. Add boards to page</small>
        </div>
      </div>
      <Button className="text-[#E79057] bg-transparent border border-[#E79057] hover:bg-[#FFF9F5] w-[180px]" onClick={handleCreateTask}>
        Add New Page
      </Button>
    </div>
  );
}

export default InitPage;
