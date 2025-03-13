import { useAuth } from "@/contexts/AuthContext";

const HomeScreen = () => {
  const { user } = useAuth();

  const username = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "Guest";

  return (
    <div className="flex flex-col items-center justify-end w-full h-full">
      <div className="text-primary text-2xl font-bold">
        Hi, {username}!
      </div>
    </div>
  );
};

export default HomeScreen;
