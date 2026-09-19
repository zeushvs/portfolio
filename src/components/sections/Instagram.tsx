import { categories } from "@/data/projects";
import HorizontalGallery from "../HorizontalGallery";

const category = categories.find((c) => c.id === "instagram")!;

export default function Instagram() {
  return <HorizontalGallery category={category} />;
}
