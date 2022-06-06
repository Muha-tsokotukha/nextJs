import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { User } from "../../store/types";

type Prop = { user: User };

const User: NextPage<Prop> = ({ user }: Prop) => {
  return (
    <>
      <NextSeo title={user.username} />
      <h1>
        {user.username} - {user.phone}
      </h1>
      <p>{user.email}</p>
      <a target="blank" href={"https://" + user.website}>
        {user.website}
      </a>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/`);
  const data = await res.json();
  const paths = data.map((item: User) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userId = params?.id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/`
  );
  const user = await response.json();

  return {
    props: {
      user,
    },
  };
};

export default User;
