import Link from "next/link"

export default function LoginPage(){
    return(
        <Link href={"/login/github"}>
            login through Github
        </Link>
    )
}