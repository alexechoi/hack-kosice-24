import "./text-area.css";

interface TextAreaProps {
    label?: string;
    placeholder?: string;
}

export const TextArea = ({ ...props }: TextAreaProps) => {
    return (
    <div className="text-area">
        {props.label && <label className="text-input__label">{props.label}</label>}
        <input
            type="text"
            className="text-area__input"
            placeholder={props.placeholder}
        />
    </div>
    );
};
