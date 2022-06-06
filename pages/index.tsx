import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { User } from "./types";

type Prop = { users: User[] };

const UserList: NextPage<Prop> = ({ users }: Prop) => {
  return (
    <main className="container">
      <NextSeo title="Users list" />
      <h1>Users list</h1>
      <hr />
      {users?.map((user) => (
        <div key={user.id} className="user-container">
          <Link href={`/UserTasks/${user.id}`} style={{ cursor: "pointer" }}>
            <a className="user-task">Task of {user.name} -</a>
          </Link>
          <Link href={`/User/${user.id}`}>
            <a className="user"> More about {user.username}</a>
          </Link>
        </div>
      ))}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};

export default UserList;
