import {Input} from "@/components/ui/input";


const Email_Templates = [{
    Friendly : {
        id : "",
        date : "",
        template_name : "Firendly",
        placeholders : "",
        senders_name : "",
        receivers_name : "",
        reply_to_email : ""
    },
    Professional : {
        id : "",
        date : "",
        template_name : "Professional",
        placeholders : "",
        senders_name : "",
        receivers_name : "",
        reply_to_email : ""
    },

}]

export const Placeholders : { title : string; label : string; component : JSX.Element, metadata : string }[] = [{
    title : "Template Name",
    label : "Template Name",
    component : <Input
        type="text"
        placeholder={"My template"}
        className="h-10"
    />,
    metadata: ""

}, {
    title : "Sender Name",
    label : "Sender Name",
    component : <Input
        type="text"
        placeholder={"Sidharth"}
        className="h-10"
    />,
    metadata : "How you'll appear in the recipient's inbox"

} , {
    title : "Reply-to email",
    label : "Reply-to email",
    component : <Input
        type="email"
        placeholder={"reply@email.com"}
        className="h-10"
    />,
    metadata: ""
}]

export default Email_Templates;