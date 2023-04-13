import { FC, useState } from 'react';
import axios from 'axios';

import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import { Button } from '@progress/kendo-react-buttons';
import { TextArea } from '@progress/kendo-react-inputs';

const GPT_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const ChatGpt: FC = (): JSX.Element => {
  const [completedSentence, setCompletedSentence] = useState<string>('');

  const fetchData = async (input: string) => {
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
  };

  async function handleClick(values: { [name: string]: string }) {
    const { comments } = values;
    try {
      const completedSentence = await fetchData(comments);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <Form
        onSubmit={handleClick}
        render={(formRenderProps) => (
          <FormElement
            style={{
              width: 400
            }}
          >
            <fieldset className={'k-form-fieldset'}>
              <Label>Tell me something ! I'll complete it !</Label>
              <Field
                id={'comments'}
                name={'comments'}
                label={'Comments'}
                component={TextArea}
              />
              <div className="k-form-buttons">
                <Button
                  themeColor={'primary'}
                  type={'submit'}
                  disabled={!formRenderProps.allowSubmit}
                >
                  Send to chatGpt
                </Button>
                <Button onClick={formRenderProps.onFormReset}>Clear</Button>
              </div>
            </fieldset>
          </FormElement>
        )}
      />
      {completedSentence && <p>{completedSentence}</p>}
    </div>
  );
};

export default ChatGpt;
