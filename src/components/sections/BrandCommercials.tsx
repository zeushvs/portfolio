import { categories } from "@/data/projects";
import HorizontalGallery from "../HorizontalGallery";

const category = categories.find((c) => c.id === "brand")!;

export default function BrandCommercials() {
  return <HorizontalGallery category={category} numberOnly />;
}
