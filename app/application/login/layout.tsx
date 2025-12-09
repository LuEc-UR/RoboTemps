import Logo from "@/components/Logo";

export default function LoginLayout({
    children,
}:  {
    children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F8FAFC] min-h-screen px-5 py-5">
      <Logo />
      <div className="justify-center items-center flex p-10">
        {children}
      </div>
    </div>
  );
}