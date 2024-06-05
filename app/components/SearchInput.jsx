import { fn } from "@/utils/utilityFunction";
import { Icon } from "@iconify/react";
import { Form, InputGroup } from "rsuite";

const SearchInput = () => {
    return (
        <Form>
            <Form.Group controlId={"email"}>
                <InputGroup className={`rounded-full overflow-hidden`} style={{ width: fn.rem(355), border: `1px solid #83979B`, backgroundColor: `#83979B50` }} inside>
                    <InputGroup.Addon className={`text-emBlue`}>
                        <Icon fontSize={`1.5rem`} icon='mynaui:search' />
                    </InputGroup.Addon>
                    <Form.Control className={`bg-transparent py-3`} name='email' placeholder='Search' />
                </InputGroup>
            </Form.Group>
        </Form>
    );
};
export default SearchInput;
