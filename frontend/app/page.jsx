import Main from "@/components/Home/Home";
import { allChats, allUsersAction, getUserAction } from "@/lib/actions";
import { clientRoutes } from "@/lib/helpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const id = cookies().get("user")?.value
  if (!id) redirect(clientRoutes.login)

  const user = await getUserAction({ id: id })
  const messages = await allChats({ user_id: id })
  const allUsers = await allUsersAction()

  return (
    <Main user={user.data} allUsers={allUsers.data} messages={messages.data} />
  );
}
