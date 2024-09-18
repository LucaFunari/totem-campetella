import PageTitle from "./PageTitle";
import { useDetailedPageStore } from "../../zustand-stores";
import Grid from "./Grids/Grid";
import { VideoGrid } from "./Grids/VideoGrid";

const MainPage = () => {
  const { page } = useDetailedPageStore();

  if (page)
    return (
      <>
        <PageTitle />

        <p className="w-full whitespace-pre-line">{page.description}</p>

        {page.children && <Grid elements={page.children}></Grid>}

        {page.content && <VideoGrid content={page.content} />}
      </>
    );
};

export default MainPage;
