import { useTitle } from "@vueuse/core";

export const title = useTitle("Locations", {
  titleTemplate: "%s | Location Amenity Availabilities",
});
