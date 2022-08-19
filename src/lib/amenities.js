import { reactive } from "vue";
import airtable from "./airtable";

export const amenities = reactive({
  error: "",
  loading: false,
  data: [],
});

export async function fetchAmenities(slug) {
  amenities.loading = true;
  try {
    const { data } = await airtable.get(`/LocationAmenities`, {
      params: {
        filterByFormula: `ARRAYJOIN({LocationSlug}) = '${slug}'`,
        view: "AppView",
      },
    });

    amenities.data = data.records;
  } catch (error) {
    // error
    // 401 unauth
    // 422 (Unprocessable Entity)

    amenities.error = error.message;
  } finally {
    amenities.loading = false;
  }
}
