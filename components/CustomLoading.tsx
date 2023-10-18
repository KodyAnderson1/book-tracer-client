import { Loader2 } from "lucide-react";
import { title, subtitle } from "@/components/primitives";

interface MyLoadingScreenProps {
  header: string;
  subheader?: string;
  isLoading: boolean;
  user?: string; // Define user type according to your needs
}

export const CustomLoading: React.FC<MyLoadingScreenProps> = ({
  header,
  subheader,
  isLoading,
  user,
}) => {
  if (isLoading) {
    return (
      <section className="flex flex-col h-screen px-4 md:px-0">
        <header>
          <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
            {header}
          </h1>
          {subheader && (
            <h2 className={subtitle({ className: "text-background-foreground" })}>
              Welcome,&nbsp;
              <span className="font-semibold">{user || "User"}</span>
            </h2>
          )}
        </header>
        <div className="flex-grow flex justify-center items-center">
          <Loader2 absoluteStrokeWidth={true} height={120} width={120} className="animate-spin" />
        </div>
      </section>
    );
  }
  return null;
};
