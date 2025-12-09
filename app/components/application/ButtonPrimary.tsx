// /app/dashboard/components/ButtonPrimary.tsx
"use client";

type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function ButtonPrimary({ children, onClick }: ButtonPrimaryProps) {
  return (
    <button className="btn-primary-dashboard" onClick={onClick}>
      {children}
    </button>
  );
}
