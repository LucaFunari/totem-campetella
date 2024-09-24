import React from "react";
import { useLocalizationStore } from "../../zustand-stores";

const LangBtn = (props: { lang: "en" | "it" }) => {
  const { lang, setLang } = useLocalizationStore();

  return (
    <button
      onClick={() => setLang(props.lang)}
      disabled={lang == props.lang}
      className="pointer-events-auto flex aspect-square h-28 w-auto items-center justify-center overflow-clip rounded-full border-8 border-white disabled:border-blue-400"
    >
      <img
        src={`/asset/icons/${props.lang}.svg`}
        className="h-full w-full object-cover"
      />
    </button>
  );
};

export default LangBtn;
