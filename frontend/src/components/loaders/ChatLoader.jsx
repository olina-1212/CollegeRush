import Owl from "../../assets/owl.svg";

export default function ChatLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src={Owl}
        alt="Loading chat"
        className="w-32 h-32"
      />

      <p className="mt-6 text-muted-foreground">
        Connecting conversation...
      </p>
    </div>
  );
}