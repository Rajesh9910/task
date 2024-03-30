import Main from "@/components/Home/Home";
import { getUserAction } from "@/lib/actions";
import { clientRoutes } from "@/lib/helpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const id = cookies().get("user")?.value
  if (!id) redirect(clientRoutes.login)

  const user = await getUserAction({ id: id })

  return (
    <Main user={user.data} />
  );
}
