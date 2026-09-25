import NotchNavDemo from "@/components/ui/adaptive-notch-demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaptive Notch Navigation Bar Demo | Anvaya",
  description: "Live demonstration of the Adaptive Notch Navigation Bar",
};

export default function NotchNavPage() {
  return <NotchNavDemo />;
}
