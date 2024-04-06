import { TextArea } from '../Common/TextArea/TextArea';
import { TextInput } from '../Common/TextInput/TextInput';
import { Button } from '../Common/Button/Button';
import "./contact-form.css";

export const ContactForm = () => {
    return (
        <form className='contact-form'>
            <h1>Contact us</h1>
            <div className='contact-form__input'>
                <TextInput label="Your name" placeholder="John" initialText=""/>
                <TextInput label="Your surname" placeholder="Doe" initialText=""/>
                <TextInput label="Email" placeholder="hello@zirkonenterprises.com" initialText=""/>
                <TextInput label="Phone number" placeholder="911" initialText=""/>
                <TextArea label="What bothers you:" placeholder="I'd like to report, that..."/>
            </div>
            
            <div className='contact-form__button'>
                <Button type="primary" label="Send message" icon={undefined}/>
            </div>
        </form>
    );
};
