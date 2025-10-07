import React from "react";
import ThirdLevelPageHeader from "../../second-level-pages/ThirdLevelPageHeader";
import PageTitle from "../../third-level-pages/PageTitle";
import Spinner from "../../reusable/Spinner";
import Gallery from "./Gallery";

function Dashboard() {
  const [iframeLoaded, setIframeLoaded] = React.useState(false);

  return (
    <div className="radial-bg grid h-full w-full grid-rows-[1fr_9fr] text-white">
      <ThirdLevelPageHeader />

      <div className="flex w-full flex-col">
        <PageTitle className="px-20">
          Dashboard
          {/* {settingsData["service_titolo" as keyof typeof settingsData]} */}
        </PageTitle>

        <div className="flex flex-1 flex-col items-center justify-start gap-10">
          <div className="relative aspect-[16/10] w-full">
            {!iframeLoaded && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-contentLg">
                <Spinner />
              </div>
            )}
            <iframe
              onLoad={() => setIframeLoaded(true)}
              title="Dashboard"
              className="h-full w-full"
              src={iframeUrl}
            />
          </div>

          {slideImages.length ? <Gallery images={slideImages} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const iframeUrl = "https://campetella-token-ubisive.dev.jef.it/";

const slideImages = [
  "./asset/img/1.png",
  "./asset/img/2.png",
  "./asset/img/3.png",
  "./asset/img/4.png",
  "./asset/img/5.png",
  "./asset/img/6.png",
  "./asset/img/7.png",
];
