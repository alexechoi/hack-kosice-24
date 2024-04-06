import { type Pricing } from "../../types/pricing";
import "./pricing-section.css";
import { Button } from "../Common/Button/Button";

interface PricingSectionProps {
    options: Pricing[];
}

export const PricingSection = ({ ...props }: PricingSectionProps) => {
    return (
        <div className="pricing-section">
            <div className="pricing-section__header">
                <h1>Pricing plans for teams of all sizes</h1>
                <p>These pricing plans are top notch. I would recommend them even to my mom!</p>
            </div>
            <div>
                <br />
            </div>
                {props.options.map((option, i) => (
                    <div key={i} data-isMostPopular={option.isMostPopular} className={`pricing-section__section ${option.name}`}>
                        <h2>{option.name}</h2>
                        <p>{option.description}</p>
                        <h3>${option.price}</h3><h4> / month</h4>
                        <ul>
                            {option.pros.map((pro, j) => (
                                <li>{option.pros[j]}</li>
                            ))}
                        </ul>
                        <Button 
                            label="Buy plan"
                            type={`${option.isMostPopular ? "primary" : "secondary"}`}
                        />
                    </div>
                ))}
        </div>
    )
};
