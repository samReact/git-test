import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GPT_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const useChatGpt = () => {
  const [input, setInput] = useState<string | undefined>();

  const fetchData = useCallback(async (input: string | undefined) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: `Complete this sentence: "${input}"`,
          model: 'text-davinci-002',
          max_tokens: 50,
          n: 1,
          stop: '.'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GPT_API_KEY}`
          }
        }
      );
      return response.data.choices[0].text;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { isLoading, data, isFetching, isPreviousData } = useQuery({
    queryKey: ['chat', input],
    queryFn: () => fetchData(input),
    enabled: !!input
  });

  return {
    data,
    isLoading,
    isFetching,
    input,
    setInput,
    isPreviousData
  };
};
