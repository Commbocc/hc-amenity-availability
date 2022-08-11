import { reactive } from "vue";
import airtable from "./airtable";

export const plots = reactive({
  error: "",
  loading: false,
  data: [],
});

export async function fetchPlots(slug) {
  plots.loading = true;
  try {
    const { data } = await airtable.get(`/plots`, {
      params: {
        filterByFormula: `ARRAYJOIN({LocationSlug}) = '${slug}'`,
        view: "AppView",
      },
    });

    plots.data = data.records;
  } catch (error) {
    // error
    // 401 unauth
    // 422 (Unprocessable Entity)

    plots.error = error.message;
  } finally {
    plots.loading = false;
  }
}
