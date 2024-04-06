import "./button.css";
import { HeroIcon } from "../../../types/icons.ts";

interface ButtonProps {
    type: "primary" | "secondary";
    label: string;
    icon?: HeroIcon;
}

export const Button = ({ ...props }: ButtonProps) => {
    return (
        <div className="button">
            <button 
                className="button__button"
                value={props.label}
                type="submit"
                data-buttonType={props.type}
                data-icon={props.icon}
            >{props.label && <label className="button__label">{props.label}</label>}
            </button>
        </div>
    );
};
