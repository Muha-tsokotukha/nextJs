import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Task } from "../types";

type Prop = { tasks: Task[]; user: string };

const UserTasks: NextPage<Prop> = ({ tasks, user }: Prop) => {
  return (
    <>
      <NextSeo title={user} />
      <h1>{user} task list</h1>
      {tasks?.map((task) => (
        <div key={task.id}>
          <span>
            {task.id} : {task.title}
          </span>
          <br />
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = params?.user;
  const resTodos = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`
  );
  const todos = await resTodos.json();
  const resUser = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/`
  );
  const user = await resUser.json();

  return {
    props: { tasks: todos, user: user.name },
  };
};

export default UserTasks;
