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

        <div className="flex flex-1 flex-col items-center justify-center gap-7">
          <div className="relative aspect-video w-full">
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

const iframeUrl = "https://www.ubisive.it/";

const slideImages = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",

  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];
