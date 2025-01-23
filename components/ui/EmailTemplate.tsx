import Email_Templates from "@/app/constants/template";
import {Card, CardHeader} from "@/components/ui/card";

export default function EmailTemplate(){
    return(
        <div>
            {Email_Templates.map((template) => (
                <Card>
                    <CardHeader>{}</CardHeader>
                </Card>
            ))}
        </div>
    )
}