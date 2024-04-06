import "./text-input.css";

interface TextInputProps {
    label?: string;
    placeholder?: string;
    initialText?: string;
}

export const TextInput = ({ ...props }: TextInputProps) => {
    return (
        <div className="text-input">
            {props.label && <label className="text-input__label">{props.label}</label>}

            <input
                className="text-input__input"
                type="text"
                placeholder={props.placeholder}
                defaultValue={props.initialText}
            />
        </div>
      );  
};
