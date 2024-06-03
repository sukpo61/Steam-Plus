import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { recentKeywordStates } from "src/recoil-states/recentKeywordStates";

export const useSearchKeyword = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const resetRecentKeywords = useResetRecoilState(recentKeywordStates);
  const [recentKeywords, setRecentKeywords] =
    useRecoilState(recentKeywordStates);
  const [isInitial, setIsInitial] = useState(true);

  const updateKeywords = useCallback(
    (keyword: string) => {
      if (!recentKeywords.includes(keyword)) {
        // 최신 순으로 배열의 맨 앞에 추가
        const updatedKeywords = [keyword, ...recentKeywords];
        // 최대 저장 개수를 유지하도록 자르기
        const maxKeywords = 10; // 원하는 최대 키워드 개수 설정
        const trimmedKeywords = updatedKeywords.slice(0, maxKeywords);
        setRecentKeywords(trimmedKeywords);
      }
    },
    [recentKeywords, setRecentKeywords]
  );

  const searchKeyword = async (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }
    if (!inputRef.current?.value) {
      return;
    }
    const keyword = inputRef.current.value;
    // 중복되지 않는 키워드인지 확인
    updateKeywords(keyword);
    await router.replace(`/search/${keyword}`);
  };
  useEffect(() => {
    setIsInitial(false);
  }, []);

  if (!isInitial) {
    return {
      searchKeyword,
      inputRef,
      recentKeywords,
      setRecentKeywords,
      updateKeywords,
      resetRecentKeywords,
    };
  } else {
    return {
      searchKeyword,
      inputRef,
      updateKeywords,
      resetRecentKeywords,
    };
  }
};
