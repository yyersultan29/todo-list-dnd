import { ChangeEvent, FC, memo, useState } from "react";

interface IProps {
  name: string;
  value?: string;
  onSubmit: (value: string) => void
}

const TodoFormMemo: FC<IProps> = ({ name, value, onSubmit }) => {

  const [input, setInput] = useState(value ?? "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleSubmit = () => onSubmit(input)

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center border-2 rounded-lg">{name}</h3>
      <input
        className="border-2 p-2 outline-none"
        type="text"
        placeholder="Todo ..."
        value={input}
        onChange={handleChange}
      />

      <button className="bg-blue-500 p-2 rounded-lg" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export const TodoForm = memo(TodoFormMemo);