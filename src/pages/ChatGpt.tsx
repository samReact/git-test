import { FC } from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import { Button } from '@progress/kendo-react-buttons';
import { TextArea } from '@progress/kendo-react-inputs';
import { Loader } from '@progress/kendo-react-indicators';

import { useChatGpt } from '../hooks/useChatGpt';

const ChatGpt: FC = (): JSX.Element => {
  const { data, isFetching, setInput, isPreviousData } = useChatGpt();

  async function handleClick(values: { [name: string]: string }) {
    const { comments } = values;
    if (comments.length > 0 && !isPreviousData) {
      setInput(comments);
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
      {isFetching ? (
        <div
          className="row"
          style={{
            marginTop: 10
          }}
        >
          <Loader size="small" type={'infinite-spinner'} />
        </div>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default ChatGpt;
